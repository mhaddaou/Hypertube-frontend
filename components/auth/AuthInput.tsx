import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AuthInputProps = React.ComponentProps<typeof Input>;

export default function AuthInput({ className, ...props }: AuthInputProps) {
  return (
    <Input
      className={cn(
        "h-11 bg-auth-background/60 border-secondary-text/50 text-secondary-text placeholder:text-secondary-text/50 focus-visible:ring-primary",
        className
      )}
      {...props}
    />
  );
}
