export type Market = { name: string; division: string; min: number; max: number; avg: number };

export type Product = {
  id: string;
  name: string;
  emoji: string;
  unit: string;       // "প্রতি কেজি"
  price: number;      // always a real number
  changePct: number;  // +2.1, -2.9, 0
  category: string;   // slug, e.g. "chal"
  description?: string;
  markets: Market[];
};

export type Category = { slug: string; name: string; emoji: string };