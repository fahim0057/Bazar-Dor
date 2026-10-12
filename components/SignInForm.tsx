"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    // Client-side validation
    if (!email.trim() || !password) return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("সঠিক ইমেইল দিন");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) return toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে");

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
    router.refresh(); // re-run server components so the navbar sees the new session
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-sm">ইমেইল</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" className="input w-full mt-1 bg-white" />
        </div>
        <div>
          <label htmlFor="password" className="text-sm">পাসওয়ার্ড</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর" className="input w-full mt-1 bg-white" />
        </div>
        <button type="submit" disabled={loading}
          className="btn w-full border-0 bg-brand text-white hover:bg-brand-dark shadow">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>
      </form>

      <SocialButtons />

      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="text-brand hover:underline">সাইন আপ করুন</Link>
      </p>
    </>
  );
}