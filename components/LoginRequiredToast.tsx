"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginRequiredToast() {
  const params = useSearchParams();
  const needsLogin = params.get("error") === "login-required";

  useEffect(() => {
    if (needsLogin) toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "login-required" });
  }, [needsLogin]);

  return null;
}