import { Suspense } from "react";
import AuthShell from "@/components/AuthShell";
import SignInForm from "@/components/SignInForm";
import LoginRequiredToast from "@/components/LoginRequiredToast";

export default function SignInPage() {
  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <Suspense fallback={null}>
        <LoginRequiredToast />
      </Suspense>
      <SignInForm />
    </AuthShell>
  );
}