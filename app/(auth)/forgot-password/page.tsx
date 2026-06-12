import Image from "next/image";
import AuthHeader from "@/components/auth/AuthHeader";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-auth-background">
      <AuthHeader />

      <div className="flex flex-1 overflow-hidden">
        {/* Left 50% — background image */}
        <div className="relative w-1/2 hidden md:block">
          <Image
            src="/images/signup.png"
            alt="HyperTube background"
            fill
            className="object-cover object-center rounded-r-[100px]"
            priority
          />
        </div>

        {/* Right 50% — form on auth background color */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-10 overflow-y-auto">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
