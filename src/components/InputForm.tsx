import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { SIPInputs } from "@/lib/sip";

interface InputFormProps {
  inputs: SIPInputs;
  onChange: (inputs: SIPInputs) => void;
  error: string | null;
}

export function InputForm({ inputs, onChange, error }: InputFormProps) {
  const handleChange = (field: keyof SIPInputs, value: string) => {
    const numValue = parseFloat(value) || 0;
    onChange({ ...inputs, [field]: numValue });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-foreground">SIP Calculator</h2>
        <p className="text-muted-foreground text-sm">
          Calculate your investment returns with year-by-year breakdown
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="initial" className="text-sm font-medium">
              Initial Investment
            </Label>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p>One-time lump sum amount you want to invest at the beginning</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="initial"
            type="number"
            min="0"
            step="1000"
            value={inputs.initialInvestment}
            onChange={(e) => handleChange("initialInvestment", e.target.value)}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            One-time lump sum investment
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="monthly" className="text-sm font-medium">
              Monthly Investment
            </Label>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Fixed amount you plan to invest every month through SIP</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="monthly"
            type="number"
            min="0"
            step="500"
            value={inputs.monthlyInvestment}
            onChange={(e) => handleChange("monthlyInvestment", e.target.value)}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Systematic monthly contribution
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="return" className="text-sm font-medium">
              Expected Annual Returns (%)
            </Label>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Expected yearly return rate from your investment (e.g., equity funds: 10-15%, debt funds: 6-8%)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="return"
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={inputs.expectedReturn}
            onChange={(e) => handleChange("expectedReturn", e.target.value)}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Expected annual rate of return
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="tenure" className="text-sm font-medium">
              Investment Tenure (Years)
            </Label>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Total duration for which you plan to continue the SIP investment</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="tenure"
            type="number"
            min="1"
            max="50"
            step="1"
            value={inputs.tenure}
            onChange={(e) => handleChange("tenure", e.target.value)}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Duration of investment in years
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="stepUp" className="text-sm font-medium">
              Annual Step-up (%)
            </Label>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Yearly increase in your monthly SIP amount (e.g., 10% means ₹10,000 becomes ₹11,000 next year)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input
            id="stepUp"
            type="number"
            min="0"
            max="100"
            step="1"
            value={inputs.stepUp}
            onChange={(e) => handleChange("stepUp", e.target.value)}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Annual increase in monthly SIP amount
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
          <p className="text-sm text-destructive font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
