import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div>
      <div className="skeleton h-24 w-full rounded-2xl" />
      <div className="skeleton mt-6 h-16 w-full rounded-2xl" />
      <div className="mt-6">
        <GridSkeleton count={4} />
      </div>
    </div>
  );
}