import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InputForm } from "@/components/InputForm";
import { SummaryCards } from "@/components/SummaryCards";
import { ResultsTable } from "@/components/ResultsTable";
import { ResultsChart } from "@/components/ResultsChart";
import { computeYearlyBreakdown, validateInputs, SIPInputs, YearlyBreakdown } from "@/lib/sip";
import { exportToCSV } from "@/utils/format";
import { Download, RefreshCw, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DEFAULT_INPUTS: SIPInputs = {
  initialInvestment: 0,
  monthlyInvestment: 10000,
  expectedReturn: 12,
  tenure: 10,
  stepUp: 0,
};

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputs, setInputs] = useState<SIPInputs>(DEFAULT_INPUTS);
  const [results, setResults] = useState<YearlyBreakdown[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load from URL on mount
  useEffect(() => {
    const urlInputs = {
      initialInvestment: parseFloat(searchParams.get("initial") || "") || DEFAULT_INPUTS.initialInvestment,
      monthlyInvestment: parseFloat(searchParams.get("monthly") || "") || DEFAULT_INPUTS.monthlyInvestment,
      expectedReturn: parseFloat(searchParams.get("return") || "") || DEFAULT_INPUTS.expectedReturn,
      tenure: parseInt(searchParams.get("tenure") || "") || DEFAULT_INPUTS.tenure,
      stepUp: parseFloat(searchParams.get("stepUp") || "") || DEFAULT_INPUTS.stepUp,
    };
    
    setInputs(urlInputs);
    calculate(urlInputs);
  }, []);

  const calculate = (currentInputs: SIPInputs) => {
    const validationError = validateInputs(currentInputs);
    
    if (validationError) {
      setError(validationError);
      setResults([]);
      return;
    }

    setError(null);
    const breakdown = computeYearlyBreakdown(
      currentInputs.initialInvestment,
      currentInputs.monthlyInvestment,
      currentInputs.expectedReturn,
      currentInputs.tenure,
      currentInputs.stepUp
    );
    setResults(breakdown);

    // Update URL
    setSearchParams({
      initial: currentInputs.initialInvestment.toString(),
      monthly: currentInputs.monthlyInvestment.toString(),
      return: currentInputs.expectedReturn.toString(),
      tenure: currentInputs.tenure.toString(),
      stepUp: currentInputs.stepUp.toString(),
    });
  };

  const handleInputChange = (newInputs: SIPInputs) => {
    setInputs(newInputs);
    calculate(newInputs);
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResults([]);
    setError(null);
    setSearchParams({});
    toast({
      title: "Reset Complete",
      description: "All inputs have been reset to default values.",
    });
  };

  const handleExport = () => {
    if (results.length === 0) {
      toast({
        title: "No Data",
        description: "Calculate results first before exporting.",
        variant: "destructive",
      });
      return;
    }
    exportToCSV(results);
    toast({
      title: "Export Successful",
      description: "CSV file has been downloaded.",
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link Copied",
        description: "Shareable link copied to clipboard.",
      });
    });
  };

  const lastResult = results[results.length - 1];

  return (
    <div className="min-h-screen bg-gradient-bg flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl flex-1">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left Panel - Inputs */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-elevated bg-card sticky top-8">
              <InputForm inputs={inputs} onChange={handleInputChange} error={error} />
              
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="flex-1"
                  disabled={results.length === 0}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-3 space-y-6">
            {results.length > 0 ? (
              <>
                <SummaryCards
                  totalValue={lastResult.value}
                  totalInvested={lastResult.invested}
                  totalProfit={lastResult.profit}
                />

                <ResultsChart data={results} />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-foreground">Year-by-Year Breakdown</h3>
                    <Button onClick={handleExport} size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                  <ResultsTable data={results} />
                </div>
              </>
            ) : (
              <Card className="p-12 shadow-card bg-gradient-card border-border/50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Ready to Calculate</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Enter your investment details in the form to see your projected returns with a detailed year-by-year breakdown.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
