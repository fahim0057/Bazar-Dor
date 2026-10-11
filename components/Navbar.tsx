import { Suspense } from "react";
import Link from "next/link";
import { getCategories } from "@/lib/api";
import NavLinks from "./NavLinks";
import BanglaDate from "./BanglaDate";

export default async function Navbar() {
  const categories = await getCategories();
  return (
    <header className="bg-card border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-xl">🛒</span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold">বাজার দর</span>
            <BanglaDate />
          </span>
        </Link>
  </div>
         <div className="border-t border-gray-100">
        <Suspense fallback={<NavLinksFallback />}>
          <NavLinks categories={categories} />
        </Suspense>
      </div>
    </header>
  );
}

// Shown for a split second while the URL is read. It's the same height as the real links, so the page doesn't jump.
function NavLinksFallback() {
  return (
    <div className="flex gap-2 max-w-6xl mx-auto px-4 py-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton h-8 w-20 rounded-lg" />
      ))}
    </div>
  );
}