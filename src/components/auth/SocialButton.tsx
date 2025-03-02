
import { Button } from "@/components/ui/button";
import { SocialProvider, getProviderColor } from "@/lib/auth";
import { Facebook, Github, LucideIcon } from "lucide-react";
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
        return <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>;
      case "facebook":
        return <Facebook className="mr-2 h-4 w-4" />;
      case "github":
        return <Github className="mr-2 h-4 w-4" />;
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
