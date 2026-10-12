"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    const { error } = await authClient.signOut();
    if (error) return toast.error("সাইন আউট ব্যর্থ হয়েছে");
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  if (isPending) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton h-28 w-full rounded-2xl" />
      </div>
    );
  }

  if (!session) {
    router.replace("/signin?error=login-required");
    return null;
  }

  const { name, email, image } = session.user;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={name} referrerPolicy="no-referrer"
                className="h-20 w-20 rounded-xl object-cover" />
            ) : (
              <span className="grid h-20 w-20 place-items-center rounded-xl bg-brand text-3xl font-semibold text-white">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
            <div>
              <p className="text-xl font-semibold">{name}</p>
              <p className="text-gray-500 break-all">{email}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href="/profile/update"
              className="btn btn-sm sm:btn-md border-0 bg-brand text-white hover:bg-brand-dark">
              তথ্য আপডেট করুন
            </Link>
            <button type="button" onClick={handleSignOut}
              className="btn btn-sm sm:btn-md btn-outline border-red-500 text-red-600 hover:bg-red-50 hover:border-red-500">
              সাইন আউট
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}