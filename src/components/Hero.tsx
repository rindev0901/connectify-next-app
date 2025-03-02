import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import AuthModal from "@/components/auth/AuthModal";
import FadeIn from "@/components/animations/FadeIn";
import BlurImage from "@/components/ui/blur-image";

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20 z-0" />

      {/* Decorative elements */}
      <div className="absolute top-24 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-70" />
      <div className="absolute top-36 right-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-60" />

      <div className="container mx-auto px-4 py-24 pt-32 md:py-32 md:pt-40 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <FadeIn direction="up">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
                Introducing Nextify
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                The next generation app platform
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={200}>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Experience the future of web applications with seamless social
                authentication and cutting-edge features.
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
                <Button
                  size="lg"
                  onClick={() => !isAuthenticated && setIsAuthModalOpen(true)}
                  className="relative group overflow-hidden h-12 px-8"
                >
                  <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-white/10 group-hover:translate-x-0"></span>
                  <span className="relative">Get Started</span>
                </Button>

                <Button variant="outline" size="lg" className="h-12 px-8 group">
                  <span className="relative group-hover:text-primary transition-colors">
                    Learn More
                  </span>
                </Button>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={400}>
              <p className="text-sm text-muted-foreground mt-6">
                No credit card required. Start building for free.
              </p>
            </FadeIn>
          </div>

          <FadeIn className="relative" delay={200}>
            <div className="relative bg-gradient-to-b from-background to-muted p-1 rounded-2xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-accent/5 rounded-2xl" />
              <div className="glass overflow-hidden rounded-xl shadow-sm">
                <BlurImage
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1172&auto=format&fit=crop"
                  alt="App dashboard preview"
                  className="w-full h-auto object-cover rounded-t-xl"
                />
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="h-2 bg-muted rounded-full w-3/4"></div>
                    <div className="h-2 bg-muted rounded-full"></div>
                    <div className="h-2 bg-muted rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full animate-float" />
            <div
              className="absolute -top-4 -left-4 w-16 h-16 bg-accent/20 rounded-full animate-float"
              style={{ animationDelay: "1s" }}
            />
          </FadeIn>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Hero;
