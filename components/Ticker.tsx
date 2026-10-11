import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default async function Ticker() {
  const items = await getProducts();
  const loop = [...items, ...items]; // two copies = seamless loop with -50%
  return (
    <div className="overflow-hidden bg-card border-b border-gray-200">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {loop.map((p, i) => (
          <div key={i} className="flex items-center gap-2 px-5 py-2 text-sm border-r border-gray-200 whitespace-nowrap">
            <span>{p.emoji}</span>
            <span className="font-medium">{p.name}</span>
            <span className="text-gray-600">{toBn(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}</span>
            <ChangeBadge pct={p.changePct} />
          </div>
        ))}
      </div>
    </div>
  );
}