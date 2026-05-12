import { Button } from "@/components/ui/button";

interface SocialButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

export default function SocialButton({ icon, onClick }: SocialButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={onClick}
      className="border-white/20 bg-transparent hover:bg-white/10 text-primary-text w-11 h-11 rounded-full"
    >
      {icon}
    </Button>
  );
}
