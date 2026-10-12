"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name.trim()) return toast.error("আপনার নাম দিন");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error("সঠিক ইমেইল দিন");
    if (form.password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (form.password !== form.confirm) return toast.error("দুটি পাসওয়ার্ড মিলছে না");

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: form.name.trim(),
        email: form.email,
        password: form.password,
      });

      if (error) {
        console.log("status:", error.status, "| text:", error.statusText, "| message:", error.message, "| code:", error.code);
        toast.error(error.message || `Error ${error.status}: ${error.statusText || "unknown"}`);
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");
      await authClient.signOut();
      router.push("/signin");
    } catch (err) {
      console.error("SIGNUP CRASH:", err);
      toast.error("সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না");
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { name: "name", label: "নাম", type: "text", placeholder: "যেমন: রহিম উদ্দিন" },
    { name: "email", label: "ইমেইল", type: "email", placeholder: "you@example.com" },
    { name: "password", label: "পাসওয়ার্ড", type: "password", placeholder: "কমপক্ষে ৮ অক্ষর" },
    { name: "confirm", label: "পাসওয়ার্ড নিশ্চিত করুন", type: "password", placeholder: "আবার লিখুন" },
  ] as const;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name} className="text-sm">{f.label}</label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              value={form[f.name]}
              onChange={handleChange}
              placeholder={f.placeholder}
              className="input w-full mt-1 bg-white"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="btn w-full border-0 bg-brand text-white hover:bg-brand-dark shadow"
        >
          {loading ? <span className="loading loading-spinner loading-sm" /> : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
      </form>

      <SocialButtons />

      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-brand hover:underline">সাইন ইন করুন</Link>
      </p>
    </>
  );
}