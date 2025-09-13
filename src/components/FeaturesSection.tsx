import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, TrendingUp, Users, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Assessment",
    description: "Our sophisticated AI analyzes your personality, skills, and goals to create a comprehensive profile."
  },
  {
    icon: Target,
    title: "Personalized Roadmaps",
    description: "Get step-by-step action plans tailored specifically to your unique career aspirations and learning style."
  },
  {
    icon: TrendingUp,
    title: "Dynamic Adaptation",
    description: "Your roadmap evolves as you grow, ensuring recommendations stay relevant to your changing goals."
  },
  {
    icon: Users,
    title: "Expert-Backed Insights",
    description: "Built on frameworks used by top career counselors and validated by industry professionals."
  },
  {
    icon: Zap,
    title: "Instant Guidance",
    description: "Get immediate answers to career questions and personalized advice whenever you need it."
  },
  {
    icon: Shield,
    title: "Privacy-First Approach",
    description: "Your personal data and career information are protected with enterprise-grade security."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              PersonaPath AI
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of career guidance with our comprehensive AI-driven platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg hover:shadow-brand-primary/10 transition-all duration-300 border-border/50 hover:border-brand-primary/30">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-brand-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;