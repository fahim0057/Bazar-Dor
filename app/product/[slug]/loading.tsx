export default function Loading() {
  return (
    <div>
      <div className="skeleton h-5 w-56" />
      <div className="skeleton mt-6 h-40 w-full rounded-2xl" />
      <div className="mt-6 rounded-2xl border border-gray-200 bg-card p-5 sm:p-8">
        <div className="skeleton h-6 w-40" />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-24 rounded-xl" />
          ))}
        </div>
        <div className="skeleton mt-8 h-64 w-full rounded-xl" />
      </div>
    </div>
  );
}