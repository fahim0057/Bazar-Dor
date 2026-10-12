import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-md mx-auto py-6">
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-center text-sm text-gray-500">{subtitle}</p>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-card p-6">{children}</div>

      <p className="mt-8 text-center text-sm text-gray-500">
        <Link href="/" className="hover:text-brand">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}