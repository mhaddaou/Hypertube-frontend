import Link from "next/link";
import type { ReactNode } from "react";

const buttonVariants = {
  primary:
    "bg-[#ff9f00] text-black shadow-[0_12px_24px_rgba(255,159,0,0.22)] hover:bg-[#ffb12a]",
  outline:
    "border border-white/25 bg-black/30 text-white hover:border-[#ff9f00] hover:text-[#ff9f00]",
  ghost:
    "border border-[#ff9f00] bg-black/20 text-[#ff9f00] hover:bg-[#ff9f00] hover:text-black",
};

const baseButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-bold transition hover:-translate-y-0.5";

type ButtonVariant = keyof typeof buttonVariants;

export function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
}: {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button type={type} className={`${baseButtonClass} ${buttonVariants[variant]} ${className}`}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className = "",
  href,
  variant = "primary",
}: {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: ButtonVariant;
}) {
  return (
    <Link href={href} className={`${baseButtonClass} ${buttonVariants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
