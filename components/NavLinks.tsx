"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

export default function NavLinks({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  return (
    <nav className="flex gap-2 overflow-x-auto max-w-6xl mx-auto px-4 py-2">
      {categories.map((c) => {
        const active = pathname === `/category/${c.slug}`;
        return (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              active ? "bg-brand text-white shadow" : "text-gray-700 hover:bg-green-50"
            }`}
          >
            {c.emoji} {c.name}
          </Link>
        );
      })}
    </nav>
  );
}