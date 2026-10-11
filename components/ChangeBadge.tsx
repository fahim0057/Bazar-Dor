import { formatPct } from "@/lib/bn";

export default function ChangeBadge({ pct }: { pct: number }) {
  const up = pct > 0, down = pct < 0;
  const style = up ? "text-red-600 bg-red-50" : down ? "text-green-600 bg-green-50" : "text-gray-500 bg-gray-100";
  const symbol = up ? "▲" : down ? "▼" : "—";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${style}`}>
      {symbol} {formatPct(pct)}
    </span>
  );
}