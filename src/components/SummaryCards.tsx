import { Card } from "@/components/ui/card";
import { formatNumber } from "@/utils/format";
import { TrendingUp, Wallet, Coins } from "lucide-react";

interface SummaryCardsProps {
  totalValue: number;
  totalInvested: number;
  totalProfit: number;
}

export function SummaryCards({ totalValue, totalInvested, totalProfit }: SummaryCardsProps) {
  const profitPercentage = totalInvested > 0 ? ((totalProfit / totalInvested) * 100).toFixed(1) : "0.0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 shadow-elevated bg-gradient-card border-border/50 hover:shadow-xl transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Final Value</p>
          <p className="text-2xl font-bold text-foreground">{formatNumber(totalValue)}</p>
        </div>
      </Card>

      <Card className="p-6 shadow-elevated bg-gradient-card border-border/50 hover:shadow-xl transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 rounded-lg bg-secondary/10">
            <Wallet className="h-5 w-5 text-secondary" />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
          <p className="text-2xl font-bold text-foreground">{formatNumber(totalInvested)}</p>
        </div>
      </Card>

      <Card className="p-6 shadow-elevated bg-gradient-growth border-0 hover:shadow-xl transition-all duration-300">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2 rounded-lg bg-white/20">
            <Coins className="h-5 w-5 text-white" />
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/20 text-white">
            +{profitPercentage}%
          </span>
        </div>
        <div>
          <p className="text-sm text-white/90 mb-1">Total Profit</p>
          <p className="text-2xl font-bold text-white">{formatNumber(totalProfit)}</p>
        </div>
      </Card>
    </div>
  );
}
