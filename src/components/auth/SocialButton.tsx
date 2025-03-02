
import { Button } from "@/components/ui/button";
import { SocialProvider, getProviderColor } from "@/lib/auth";
import { Facebook, GitHub, Google } from "lucide-react";
import { cn } from "@/lib/utils";

type SocialButtonProps = {
  provider: SocialProvider;
  onClick: () => void;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
};

const SocialButton = ({
  provider,
  onClick,
  loading = false,
  fullWidth = false,
  className,
}: SocialButtonProps) => {
  const providerClass = getProviderColor(provider);
  
  const getIcon = () => {
    switch (provider) {
      case "google":
        return <Google className="mr-2 h-4 w-4" />;
      case "facebook":
        return <Facebook className="mr-2 h-4 w-4" />;
      case "github":
        return <GitHub className="mr-2 h-4 w-4" />;
    }
  };

  const getLabel = () => {
    return `Continue with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`;
  };

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={loading}
      className={cn(
        providerClass,
        "relative overflow-hidden transition-all duration-300 group",
        fullWidth ? "w-full" : "",
        className
      )}
    >
      <div className="flex items-center justify-center w-full">
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white/10 group-hover:translate-x-0"></span>
        <span className="relative flex items-center">
          {getIcon()}
          {getLabel()}
        </span>
      </div>
    </Button>
  );
};

export default SocialButton;
