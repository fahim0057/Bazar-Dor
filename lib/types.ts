export type Market = {
  name: string;
  division: string;
  min: number;
  max: number;
  avg: number;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  emoji: string;
  category: string;      // "chal"
  categoryName: string;  // "চাল"
  categoryIcon: string;
  unitKey: string;       // raw API value: "kg"
  unit: string;          // "প্রতি কেজি"
  unitShort: string;     // "কেজি"
  price: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  changePct: number;     // +2.1 / -2.9 / 0
  markets: Market[];
};

export type Category = { slug: string; name: string; emoji: string };