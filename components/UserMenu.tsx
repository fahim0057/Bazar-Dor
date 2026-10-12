"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const closeMenu = () => (document.activeElement as HTMLElement | null)?.blur();

  async function handleSignOut() {
    closeMenu();
    const { error } = await authClient.signOut();
    if (error) return toast.error("সাইন আউট ব্যর্থ হয়েছে");
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  // Skeleton while the session loads, so the buttons don't flash
  if (isPending) return <div className="skeleton h-9 w-28 rounded-lg" />;

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">সাইন ইন</Link>
        <Link href="/signup" className="btn btn-sm sm:btn-md border-0 bg-brand text-white hover:bg-brand-dark shadow">
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { name, email, image } = session.user;

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer">
        <Avatar name={name} image={image} size={36} />
        <span className="hidden sm:inline text-sm font-medium">{name.split(" ")[0]}</span>
        <span className="text-[10px] text-gray-500">▼</span>
      </div>

      <div tabIndex={0} className="dropdown-content z-50 mt-2 w-64 rounded-2xl border border-gray-200 bg-card p-4 shadow-lg">
        <p className="font-semibold">{name}</p>
        <p className="text-xs text-gray-500 break-all">{email}</p>
        <div className="mt-3 flex flex-col gap-2 text-sm">
          <Link href="/profile" onClick={closeMenu} className="hover:text-brand">
            আমার প্রোফাইল
          </Link>
          <button type="button" onClick={handleSignOut} className="text-left text-red-600 hover:underline">
            সাইন আউট
          </button>
        </div>
      </div>
    </div>
  );
}

function Avatar({ name, image, size }: { name: string; image?: string | null; size: number }) {
  if (image) {
    // plain <img> avoids needing next.config remotePatterns for Google/GitHub avatar domains
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt={name} width={size} height={size} referrerPolicy="no-referrer" className="rounded-lg object-cover" style={{ width: size, height: size }} />;
  }
  return (
    <span className="grid place-items-center rounded-lg bg-brand text-white font-semibold" style={{ width: size, height: size }}>
      {name.charAt(0).toUpperCase()}
    </span>
  );
}