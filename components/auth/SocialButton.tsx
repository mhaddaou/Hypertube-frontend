import { Button } from "@/components/ui/button";

interface SocialButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function SocialButton({
  icon,
  onClick,
  loading = false,
  disabled = false,
}: SocialButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      className="border-white/20 bg-transparent hover:bg-white/10 text-primary-text w-11 h-11 rounded-full"
    >
      {!loading && icon}
    </Button>
  );
}
