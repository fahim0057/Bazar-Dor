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

        <div className="flex items-center gap-2">
          {/* Replaced by <AuthMenu /> in the auth step */}
          <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</Link>
          <Link href="/signup" className="btn btn-sm sm:btn-md bg-brand text-white border-0 hover:bg-brand-dark">সাইন আপ</Link>
        </div>
      </div>
      <div className="border-t border-gray-100"><NavLinks categories={categories} /></div>
    </header>
  );
}