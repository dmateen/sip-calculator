import { YearlyBreakdown } from "@/lib/sip";

/**
 * Format number as currency with Indian locale (no currency symbol)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Math.round(amount));
}

/**
 * Format number with commas (without currency symbol)
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Math.round(num));
}

/**
 * Export yearly breakdown data as CSV
 */
export function exportToCSV(data: YearlyBreakdown[], filename = "sip-breakdown.csv"): void {
  const headers = ["Year", "Invested", "Value", "Profit"];
  const rows = data.map((row) => [
    row.year,
    Math.round(row.invested),
    Math.round(row.value),
    Math.round(row.profit),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
