"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Pre-fill the input once the session has loaded
  useEffect(() => {
    if (session?.user.name) setName(session.user.name);
  }, [session?.user.name]);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) return toast.error("নাম দিন");
    if (trimmed.length < 2) return toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
    if (trimmed === session?.user.name) return toast("নামে কোনো পরিবর্তন নেই");

    setLoading(true);
    const { error } = await authClient.updateUser({ name: trimmed });
    setLoading(false);

    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  if (isPending) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton h-48 w-full rounded-2xl" />
      </div>
    );
  }

  if (!session) {
    router.replace("/signin?error=login-required");
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="text-sm text-gray-500">আপনার নাম পরিবর্তন করুন।</p>

      <form onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-gray-200 bg-card p-5 space-y-4">
        <div>
          <label htmlFor="name" className="text-sm">নাম</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
            className="input w-full mt-1 bg-white" />
        </div>

        <button type="submit" disabled={loading}
          className="btn w-full border-0 bg-brand text-white hover:bg-brand-dark shadow">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "আপডেট"}
        </button>

        <Link href="/profile" className="block text-center text-sm text-gray-500 hover:underline">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </form>
    </div>
  );
}