import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatTaka } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-2xl border border-gray-200 bg-card p-4 transition hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-gray-100 text-2xl">{p.emoji}</span>
        <div>
          <h3 className="font-semibold">{p.name}</h3>
          <p className="text-xs text-gray-500">{p.unit}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-500">আজকের দাম</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{formatTaka(p.price)}</span>
        <ChangeBadge pct={p.changePct} />
      </div>
    </Link>
  );
}