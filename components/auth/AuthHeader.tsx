import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-4">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="HyperTube" width={100} height={100} />
      </Link>

      <div className="flex items-center gap-3">
        <Link href="/signin">
          <Button
            variant="outline"
            className="border-primary-text/40 text-primary-text bg-transparent hover:bg-primary-text/10"
          >
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="bg-primary hover:bg-primary/90">
            Register
          </Button>
        </Link>
      </div>
    </header>
  );
}
