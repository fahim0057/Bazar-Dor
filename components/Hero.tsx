import BanglaDate from "./BanglaDate";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-card p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center">
      <div>
        <BanglaDate className="inline-block rounded-full bg-green-100 text-brand text-xs font-medium px-3 py-1" />
        <h1 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">আজকের বাজারের দাম এক নজরে</h1>
        <p className="mt-4 text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        {/* Plain anchor, not <Link>: it scrolls on the same page */}
        <a href="#সব-পণ্য" className="btn mt-6 bg-brand text-white border-0 hover:bg-brand-dark shadow">
          সব পণ্য দেখুন
        </a>
      </div>
        <Image src="/bazar-hero.png" alt="সবজির ঝুড়ি" width={420} height={300} priority />
    </section>
  );
}