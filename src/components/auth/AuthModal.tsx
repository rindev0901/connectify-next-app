
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SocialButton from "./SocialButton";
import { SocialProvider, loginWithSocialProvider } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";
import FadeIn from "@/components/animations/FadeIn";
import { toast } from "sonner";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"sign-in" | "sign-up">("sign-in");

  const handleSocialLogin = async (provider: SocialProvider) => {
    setIsLoading(true);
    try {
      await loginWithSocialProvider(provider);
      // Note: We don't close the modal or set auth state here
      // Supabase will redirect to OAuth provider, and on return
      // the auth state will be updated via the onAuthStateChange listener
      toast.success(`Redirecting to ${provider} for authentication...`);
    } catch (error) {
      toast.error(`Error signing in with ${provider}`);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already authenticated, close the modal
  if (isAuthenticated && isOpen) {
    onClose();
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-card p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            {activeTab === "sign-in" ? "Welcome back" : "Create an account"}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="sign-in" value={activeTab} onValueChange={(v) => setActiveTab(v as "sign-in" | "sign-up")} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6 mt-2 px-6">
            <TabsTrigger value="sign-in" className="rounded-md text-sm font-medium transition-all">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up" className="rounded-md text-sm font-medium transition-all">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sign-in" className="p-6 pt-0 space-y-6">
            <FadeIn>
              <div className="space-y-3">
                <SocialButton 
                  provider="google" 
                  onClick={() => handleSocialLogin("google")} 
                  loading={isLoading}
                  fullWidth
                />
                <SocialButton 
                  provider="facebook" 
                  onClick={() => handleSocialLogin("facebook")} 
                  loading={isLoading}
                  fullWidth
                />
                <SocialButton 
                  provider="github" 
                  onClick={() => handleSocialLogin("github")} 
                  loading={isLoading}
                  fullWidth
                />
              </div>
            </FadeIn>
          </TabsContent>
          
          <TabsContent value="sign-up" className="p-6 pt-0 space-y-6">
            <FadeIn>
              <div className="space-y-3">
                <SocialButton 
                  provider="google" 
                  onClick={() => handleSocialLogin("google")} 
                  loading={isLoading}
                  fullWidth
                />
                <SocialButton 
                  provider="facebook" 
                  onClick={() => handleSocialLogin("facebook")} 
                  loading={isLoading}
                  fullWidth
                />
                <SocialButton 
                  provider="github" 
                  onClick={() => handleSocialLogin("github")} 
                  loading={isLoading}
                  fullWidth
                />
              </div>
            </FadeIn>
          </TabsContent>
        </Tabs>
        
        <div className="p-6 pt-2 text-xs text-center text-muted-foreground">
          <Separator className="my-4" />
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
