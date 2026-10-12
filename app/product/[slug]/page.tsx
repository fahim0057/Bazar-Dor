import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { bnNum, formatTaka } from "@/lib/bn";
import ChangeBadge from "@/components/ChangeBadge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProductBySlug(slug).catch(() => null);
  return { title: p ? `${p.name} | বাজার দর` : "বাজার দর" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProductBySlug(slug).catch(() => null);
  if (!p) notFound();

  // Summary numbers come from the markets array
  const mins = p.markets.map((m) => m.min);
  const maxs = p.markets.map((m) => m.max);
  const avgs = p.markets.map((m) => m.avg);
  const minPrice = mins.length ? Math.min(...mins) : p.price;
  const maxPrice = maxs.length ? Math.max(...maxs) : p.price;
  const avgPrice = avgs.length ? Math.round(avgs.reduce((a, b) => a + b, 0) / avgs.length) : p.price;

  // Sentence under the title: today vs yesterday
  const diff = p.price - p.yesterday;
  const trend =
    diff > 0 ? (
      <>গতকালের তুলনায় আজ দাম <b>বেড়েছে</b> · {formatTaka(diff)}</>
    ) : diff < 0 ? (
      <>গতকালের তুলনায় আজ দাম <b>কমেছে</b> · {formatTaka(Math.abs(diff))}</>
    ) : (
      <>গতকালের তুলনায় আজ দাম <b>অপরিবর্তিত</b></>
    );

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand">হোম</Link>
        <span>›</span>
        <Link href={`/category/${p.category}`} className="hover:text-brand">{p.categoryName}</Link>
        <span>›</span>
        <span className="text-gray-700">{p.name}</span>
      </nav>

      {/* Summary card */}
      <section className="mt-6 flex flex-col gap-5 rounded-2xl border border-gray-200 bg-card p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-center gap-4 sm:gap-5">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gray-100 text-4xl sm:h-20 sm:w-20">
            {p.emoji}
          </span>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{p.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {p.unit} ·{" "}
              <Link href={`/category/${p.category}`} className="rounded-full bg-gray-100 px-2 py-0.5 hover:text-brand">
                {p.categoryName}
              </Link>
            </p>
            <p className="mt-2 text-sm">{trend}</p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-100 px-6 py-4 text-center sm:min-w-40">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-3xl font-bold">{bnNum(p.price)}</p>
          <p className="text-xs text-gray-500">টাকা / {p.unitShort}</p>
          <div className="mt-2 flex justify-center">
            <ChangeBadge pct={p.changePct} />
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="mt-6 rounded-2xl border border-gray-200 bg-card p-5 sm:p-8">
        <h2 className="text-lg font-bold">দামের সারসংক্ষেপ</h2>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="সর্বনিম্ন দাম" value={minPrice} color="text-green-600" note="সবচেয়ে কম দামের বাজার" />
          <StatCard label="সর্বাধিক দাম" value={maxPrice} color="text-red-600" note="সবচেয়ে বেশি দামের বাজার" />
          <StatCard label="গড় দাম" value={avgPrice} color="text-green-600" note={`${p.unit}-এর হিসাবে`} />
        </div>

        <h2 className="mt-8 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>

        {p.markets.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">বাজার</th>
                  <th className="px-4 py-3 font-medium">বিভাগ</th>
                  <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                  <th className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
                  <th className="px-4 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>
              <tbody>
                {p.markets.map((m, i) => (
                  <tr key={`${m.name}-${i}`} className="border-t border-gray-300 even:bg-gray-100/60">
                    <td className="px-4 py-3">{m.name}</td>
                    <td className="px-4 py-3">{m.division}</td>
                    <td className="px-4 py-3 text-right">{formatTaka(m.min)}</td>
                    <td className="px-4 py-3 text-right">{formatTaka(m.max)}</td>
                    <td className="px-4 py-3 text-right font-bold">{formatTaka(m.avg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value, color, note }: { label: string; value: number; color: string; note: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${color}`}>
        {bnNum(value)} <span className="text-sm font-medium">টাকা</span>
      </p>
      <p className="mt-1 text-xs text-gray-500">{note}</p>
    </div>
  );
}