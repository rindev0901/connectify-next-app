
import FadeIn from "@/components/animations/FadeIn";
import { 
  ShieldCheck, 
  Zap, 
  Layout, 
  Smartphone,
  Layers,
  RefreshCw,
  Lock,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  iconClassName?: string;
};

const Feature = ({ icon, title, description, className, iconClassName }: FeatureProps) => (
  <div className={cn("p-6 rounded-xl transition-all duration-300 hover:shadow-md", className)}>
    <div className={cn("p-3 rounded-lg mb-4 inline-flex bg-primary/10 text-primary", iconClassName)}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Designed for the modern web
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-xl text-muted-foreground">
              Everything you need to build beautiful, responsive applications with powerful features.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FadeIn delay={200}>
            <Feature
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Secure Authentication"
              description="Multiple social login options with secure authentication flows and token management."
              className="glass-card"
            />
          </FadeIn>

          <FadeIn delay={300}>
            <Feature
              icon={<Zap className="h-6 w-6" />}
              title="Lightning Fast"
              description="Optimized performance with quick load times and smooth interactions."
              className="glass-card"
            />
          </FadeIn>

          <FadeIn delay={400}>
            <Feature
              icon={<Layout className="h-6 w-6" />}
              title="Modern UI"
              description="Beautiful, minimal interface with attention to detail and smooth animations."
              className="glass-card"
            />
          </FadeIn>

          <FadeIn delay={500}>
            <Feature
              icon={<Smartphone className="h-6 w-6" />}
              title="Responsive Design"
              description="Perfect experience on any device, from mobile phones to large desktops."
              className="glass-card"
            />
          </FadeIn>

          <FadeIn delay={600}>
            <Feature
              icon={<Layers className="h-6 w-6" />}
              title="Component Based"
              description="Modular architecture with reusable components for maximum flexibility."
              className="glass-card"
            />
          </FadeIn>

          <FadeIn delay={700}>
            <Feature
              icon={<RefreshCw className="h-6 w-6" />}
              title="Easy Updates"
              description="Simple update process with compatibility across versions."
              className="glass-card"
            />
          </FadeIn>

          <FadeIn delay={800}>
            <Feature
              icon={<Lock className="h-6 w-6" />}
              title="Privacy First"
              description="Built with privacy in mind, keeping your data secure and protected."
              className="glass-card"
            />
          </FadeIn>

          <FadeIn delay={900}>
            <Feature
              icon={<Globe className="h-6 w-6" />}
              title="Global Ready"
              description="Internationalization support for applications with global audience."
              className="glass-card"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Features;
