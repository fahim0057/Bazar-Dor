"use client";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  async function social(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({ provider, callbackURL: "/" });
    if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  }

  return (
    <>
      <div className="divider text-xs text-gray-500 my-4">অথবা</div>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => social("google")} className="btn btn-sm sm:btn-md bg-white border-gray-200">
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
            <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.5 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z" />
            <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.8V6.5H1.4a12 12 0 0 0 0 10.9l4-3z" />
            <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.4 6.5l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
          </svg>
          Google দিয়ে চালিয়ে যান
        </button>
        <button type="button" onClick={() => social("github")} className="btn btn-sm sm:btn-md bg-white border-gray-200">
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <path fill="currentColor" d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
          </svg>
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
    </>
  );
}