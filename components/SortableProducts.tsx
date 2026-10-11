"use client";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { toBn } from "@/lib/bn";
import ProductCard from "./ProductCard";

type Sort = "default" | "asc" | "desc";

export default function SortableProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");

  // price is a real number, so this sorts numerically (C1), never by Bengali text
  const sorted =
    sort === "default"
      ? products
      : [...products].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

  return (
    <>
      <div className="mt-6 flex justify-end items-center gap-2 rounded-2xl border border-gray-200 bg-card p-4">
        <label htmlFor="sort" className="text-sm text-gray-500">সাজান</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="select select-sm bg-white"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mt-4 text-sm text-gray-500">মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে</p>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}