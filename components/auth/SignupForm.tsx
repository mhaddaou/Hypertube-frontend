"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import SocialButton from "./SocialButton";
import { register } from "@/app/(auth)/signup/actions";

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function FortyTwoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary-text">
      <text x="2" y="18" fontSize="14" fontWeight="bold" fontFamily="monospace">42</text>
    </svg>
  );
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type OAuthProvider = "42" | "google" | "discord";

export default function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null);

  function startOAuth(provider: OAuthProvider) {
    setOauthLoading(provider);
    window.location.href = `${API_URL}/api/auth/${provider}`;
  }

  const handle42Login = () => startOAuth("42");
  const handleGoogleLogin = () => startOAuth("google");
  const handleDiscordLogin = () => startOAuth("discord");

  function setFieldError(field: string, message: string) {
    setFieldErrors((prev) => ({ ...prev, [field]: true }));
    toast.error(message);
  }

  function clearFieldError(field: string) {
    setFieldErrors((prev) => ({ ...prev, [field]: false }));
  }

  function inputClass(field: string, extra = "") {
    return `bg-auth-background/60 text-secondary-text placeholder:text-secondary-text/50 focus-visible:ring-primary ${extra} ${
      fieldErrors[field] ? "border-red-500" : "border-secondary-text/50"
    }`;
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const firstName = (data.get("firstName") as string).trim();
    const lastName = (data.get("lastName") as string).trim();
    const username = (data.get("username") as string).trim();
    const email = (data.get("email") as string).trim();
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;

    if (!firstName) return setFieldError("firstName", "First name is required");
    if (!lastName) return setFieldError("lastName", "Last name is required");
    if (!username || username.length < 3) return setFieldError("username", "Username must be at least 3 characters");
    if (username.length > 20) return setFieldError("username", "Username must be at most 20 characters");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setFieldError("email", "Please enter a valid email address");
    if (!password || password.length < 8) return setFieldError("password", "Password must be at least 8 characters");
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return setFieldError("password", "Password must contain uppercase, lowercase, and a number");
    if (password !== confirmPassword) return setFieldError("confirmPassword", "Passwords do not match");
    if (!terms) {
      toast.error("You must accept the terms and privacy policy");
      return;
    }

    setLoading(true);
    const result = await register({ firstName, lastName, username, email, password });
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Account created! Please sign in.");
    router.push("/signin");
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="font-bold text-4xl text-primary-text mb-5 font-[cursive] text-center ">
        HyperTube
      </h1>

      <p className="text-primary  font-semibold mb-5 flex items-center gap-8">
        <span className="inline-block w-1/4 h-1 bg-white rounded " />
        <span>
        Create Account with

        </span>
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <div className="flex-1 space-y-1">
            <Label htmlFor="firstName" className="text-primary-text text-xs">
              First Name
            </Label>
            <Input id="firstName" name="firstName" placeholder="First Name" className={inputClass("firstName")} onChange={() => clearFieldError("firstName")} />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor="lastName" className="text-primary-text text-xs">
              Last Name
            </Label>
            <Input id="lastName" name="lastName" placeholder="Last Name" className={inputClass("lastName")} onChange={() => clearFieldError("lastName")} />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="username" className="text-primary-text text-xs">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            placeholder="Username"
            className={inputClass("username")}
            onChange={() => clearFieldError("username")}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className="text-primary-text text-xs">
            Your Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            className={inputClass("email")}
            onChange={() => clearFieldError("email")}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-primary-text text-xs">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={inputClass("password", "pr-10")}
              onChange={() => clearFieldError("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="confirmPassword" className="text-primary-text text-xs">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className={inputClass("confirmPassword", "pr-10")}
              onChange={() => clearFieldError("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="terms"
            checked={terms}
            onCheckedChange={(v) => setTerms(v === true)}
            className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <label htmlFor="terms" className="text-xs text-primary cursor-pointer ">
            I accept the terms and privacy policy

          </label>
        </div>

        <Button
          type="submit"
          loading={loading}
          disabled={oauthLoading !== null}
          className="w-full h-10 bg-primary hover:bg-primary/90 font-semibold"
        >
          Create Account
        </Button>

        <div className="flex items-center gap-3">
          <span className="flex-1 h-px bg-white/20" />
          <span className="text-primary text-xs font-bold">or</span>
          <span className="flex-1 h-px bg-white/20" />
        </div>

        <div className="flex justify-center gap-4">
          <SocialButton
            icon={<DiscordIcon />}
            onClick={handleDiscordLogin}
            loading={oauthLoading === "discord"}
            disabled={oauthLoading !== null && oauthLoading !== "discord"}
          />
          <SocialButton
            icon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            loading={oauthLoading === "google"}
            disabled={oauthLoading !== null && oauthLoading !== "google"}
          />
          <SocialButton
            icon={<FortyTwoIcon />}
            onClick={handle42Login}
            loading={oauthLoading === "42"}
            disabled={oauthLoading !== null && oauthLoading !== "42"}
          />
        </div>

        <p className="text-center text-primary-text text-xs">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary hover:underline font-semibold">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
