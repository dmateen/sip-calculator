import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { YearlyBreakdown } from "@/lib/sip";
import { formatNumber } from "@/utils/format";

interface ResultsTableProps {
  data: YearlyBreakdown[];
}

export function ResultsTable({ data }: ResultsTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">Year</TableHead>
              <TableHead className="font-semibold text-right">Invested</TableHead>
              <TableHead className="font-semibold text-right">Value</TableHead>
              <TableHead className="font-semibold text-right">Profit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow 
                key={row.year}
                className={index === data.length - 1 ? "bg-accent/20 hover:bg-accent/30 font-medium" : ""}
              >
                <TableCell className="font-medium">Year {row.year}</TableCell>
                <TableCell className="text-right">{formatNumber(row.invested)}</TableCell>
                <TableCell className="text-right font-semibold">{formatNumber(row.value)}</TableCell>
                <TableCell className="text-right text-success font-semibold">
                  {formatNumber(row.profit)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
