import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/api";
import type { Category } from "@/lib/types";
import NavLinks from "./NavLinks";
import BanglaDate from "./BanglaDate";
import UserMenu from "./UserMenu";

export default async function Navbar() {
  // If the API is down, don't crash the whole site: show the navbar without category links
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch {}

  return (
    <header className="bg-card border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand">
            <Image src="/logo-icon.png" alt="বাজার দর লোগো" width={24} height={24} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-bold">বাজার দর</span>
            <BanglaDate />
          </span>
        </Link>

        <UserMenu />
      </div>

      <div className="border-t border-gray-100">
        <Suspense fallback={<NavLinksFallback />}>
          <NavLinks categories={categories} />
        </Suspense>
      </div>
    </header>
  );
}

function NavLinksFallback() {
  return (
    <div className="flex gap-2 max-w-6xl mx-auto px-4 py-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton h-8 w-20 rounded-lg" />
      ))}
    </div>
  );
}