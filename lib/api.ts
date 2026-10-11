import { fromBn } from "./bn";
import type { Product, Category } from "./types";

const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

// Tries each server until one answers
async function get(path: string) {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.ok) return await res.json();
    } catch {}
  }
  throw new Error("API unavailable: " + path);
}

// Works whether the API sends 148 or "১৪৮"
const num = (v: unknown) => (typeof v === "number" ? v : Number(fromBn(String(v ?? 0))) || 0);

// ⚠️ ADAPT these field names after you read the real JSON
function normalizeProduct(r: any): Product {
  return {
    id: String(r.id ?? r.slug),
    name: r.name,
    emoji: r.emoji ?? r.icon ?? "🛒",
    unit: r.unit,
    price: num(r.price),
    changePct: num(r.change ?? r.changePercent),
    category: r.category,
    description: r.description,
    markets: (r.markets ?? []).map((m: any) => ({
      name: m.name,
      division: m.division,
      min: num(m.min),
      max: num(m.max),
      avg: num(m.avg),
    })),
  };
}

// Responses may be an array or wrapped like { data: [...] }
const unwrap = (json: any) => (Array.isArray(json) ? json : json.data ?? json.products ?? []);

export async function getProducts(category?: string): Promise<Product[]> {
  const json = await get(category ? `/products?category=${category}` : "/products");
  return unwrap(json).map(normalizeProduct);
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const json = await get(`/products/${id}`);
    return normalizeProduct(json.data ?? json);
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<Category[]> {
  const json = await get("/categories");
  return unwrap(json).map((c: any) => ({ slug: c.slug ?? c.id, name: c.name, emoji: c.emoji ?? c.icon ?? "" }));
}