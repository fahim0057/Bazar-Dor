import Link from "next/link";

export default function EmptyState({
  title = "৪০৪ — পৃষ্ঠাটি পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন তা নেই বা সরিয়ে নেওয়া হয়েছে।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="text-center py-20">
      <p className="text-6xl">🔍</p>
      <h1 className="mt-4 text-2xl md:text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-600">{message}</p>
      <Link href="/" className="btn mt-6 border-0 bg-brand text-white hover:bg-brand-dark">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}