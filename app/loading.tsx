import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div>
      <div className="skeleton h-56 w-full rounded-2xl" />
      <div className="skeleton mt-10 mb-4 h-6 w-40" />
      <GridSkeleton count={6} />
    </div>
  );
}