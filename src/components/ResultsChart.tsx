import { Card } from "@/components/ui/card";
import { YearlyBreakdown } from "@/lib/sip";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "@/utils/format";

interface ResultsChartProps {
  data: YearlyBreakdown[];
}

export function ResultsChart({ data }: ResultsChartProps) {
  const chartData = data.map((row) => ({
    year: `Year ${row.year}`,
    invested: Math.round(row.invested),
    value: Math.round(row.value),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-elevated p-3">
          <p className="text-sm font-medium mb-2">{payload[0].payload.year}</p>
          <p className="text-sm text-secondary">
            Invested: <span className="font-semibold">{formatNumber(payload[0].value)}</span>
          </p>
          <p className="text-sm text-primary">
            Value: <span className="font-semibold">{formatNumber(payload[1].value)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 shadow-card bg-gradient-card border-border/50">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Growth Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="year"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            iconType="line"
            formatter={(value) => (
              <span className="text-sm font-medium">{value}</span>
            )}
          />
          <Line
            type="monotone"
            dataKey="invested"
            stroke="hsl(var(--secondary))"
            strokeWidth={2}
            name="Invested"
            dot={{ fill: "hsl(var(--secondary))", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            name="Portfolio Value"
            dot={{ fill: "hsl(var(--primary))", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
