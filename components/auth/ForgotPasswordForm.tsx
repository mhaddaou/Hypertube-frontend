"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordAction } from "@/app/(auth)/forgot-password/actions";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [sent, setSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  async function sendResetEmail(email: string): Promise<boolean> {
    const result = await forgotPasswordAction({ email });
    if (!result.ok) {
      toast.error(result.error);
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = (data.get("email") as string).trim();

    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    const ok = await sendResetEmail(email);
    setLoading(false);

    if (ok) {
      setSubmittedEmail(email);
      setSent(true);
    }
  }

  async function handleResend() {
    if (!submittedEmail) return;
    setResending(true);
    const ok = await sendResetEmail(submittedEmail);
    setResending(false);
    if (ok) toast.success("Email resent");
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-bold text-4xl text-primary-text mb-1 font-[cursive] text-center pb-12">
        HyperTube
      </h1>

      {!sent ? (
        <>
          <p className="text-primary  font-semibold mb-4 flex items-center gap-8">
            <span className="inline-block w-1/4 h-1 bg-white rounded " />
            <span>Reset Your Password</span>
          </p>

          <p className="text-secondary-text text-xs mb-5">
            Enter the email address associated with your account and we will
            send you a link to reset your password.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="email" className="text-primary-text text-xs">
                Email
              </Label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text/70"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  className="bg-auth-background/60 border-secondary-text/50 text-secondary-text placeholder:text-secondary-text/50 focus-visible:ring-primary pl-9"
                />
              </div>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full h-10 bg-primary hover:bg-primary/90 font-semibold"
            >
              Continue
            </Button>

            <div className="flex items-center gap-8">
              <Link
                href="/signin"
                className="text-sm text-primary font-semibold hover:underline text-end w-2/3"
              >
                Back to Sign In
              </Link>
              <span className="flex-1 h-1 bg-white rounded" />
            </div>

            <p className="text-center text-secondary-text text-xs">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline font-semibold"
              >
                Register
              </Link>
            </p>
          </form>
        </>
      ) : (
        <div className="space-y-5">
          <div className="flex justify-center">
            <Image
              src="/icons/email.svg"
              alt="Check your email"
              width={140}
              height={120}
              priority
            />
          </div>

          <p className="text-primary  font-semibold flex items-center gap-8 justify-center">
            <span className="inline-block w-1/4 h-1 bg-white rounded " />
            <span className="flex-1  ">

            Verify Your Email
            </span>
          </p>

          <p className="text-start text-secondary-text px-2">
            Thank you, check your email for instructions to reset your password
          </p>

          <Button
            type="button"
            onClick={() => router.push("/signin")}
            className="w-full h-10 bg-primary hover:bg-primary/90 font-semibold"
          >
            Skip Now
          </Button>

          <div className="flex items-center  gap-8 pt-5 px-8">
            <p className="text-secondary-text text-xs">
              Don&apos;t receive an email?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-primary hover:underline font-semibold disabled:opacity-50"
              >
                {resending ? "Resending..." : "Resend"}
              </button>
            </p>
            <span className="flex-1 h-1 bg-white rounded" />
          </div>
        </div>
      )}
    </div>
  );
}
