import type { Product, Category, Market } from "./types";

const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function get(path: string) {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.ok) return await res.json();
    } catch {}
  }
  throw new Error("API unavailable: " + path);
}

const UNITS: Record<string, { label: string; short: string }> = {
  kg: { label: "প্রতি কেজি", short: "কেজি" },
  litre: { label: "প্রতি লিটার", short: "লিটার" },
  liter: { label: "প্রতি লিটার", short: "লিটার" },
  dozen: { label: "প্রতি ডজন", short: "ডজন" },
  piece: { label: "প্রতি পিস", short: "পিস" },
  pcs: { label: "প্রতি পিস", short: "পিস" },
};

function normalizeProduct(r: any): Product {
  const u = UNITS[r.unit] ?? { label: `প্রতি ${r.unit}`, short: r.unit };

  // Trust "dir" so the sign is always right
  const raw = Number(r.change?.pct ?? 0);
  const changePct =
    r.change?.dir === "down" ? -Math.abs(raw) : r.change?.dir === "up" ? Math.abs(raw) : raw;

  const markets: Market[] = (r.markets ?? []).map((m: any) => ({
    name: m.market,
    division: m.division,
    min: m.min,
    max: m.max,
    avg: (m.min + m.max) / 2,
  }));

  return {
    id: r.id,
    slug: r.slug,
    name: r.nameBn,
    emoji: r.image ?? r.categoryIcon ?? "🛒",
    category: r.category,
    categoryName: r.categoryNameBn,
    categoryIcon: r.categoryIcon,
    unitKey: r.unit,
    unit: u.label,
    unitShort: u.short,
    price: r.today,
    yesterday: r.yesterday,
    lastWeek: r.lastWeek,
    lastMonth: r.lastMonth,
    changePct,
    markets,
  };
}

const unwrap = (json: any) => (Array.isArray(json) ? json : json.data ?? json.products ?? []);

export async function getProducts(category?: string): Promise<Product[]> {
  const json = await get(category ? `/products?category=${category}` : "/products");
  return unwrap(json).map(normalizeProduct);
}

// Find by slug, so /product/miniket-chal works
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const json = await get("/categories");
  return unwrap(json).map((c: any) => ({ slug: c.slug, name: c.nameBn, emoji: c.icon }));
}