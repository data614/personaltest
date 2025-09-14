import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Layers, Bot, BarChart3, Plug } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Map,
    title: "Personalized Roadmaps",
    description: "Tailored career paths to help you reach your unique goals.",
    link: "/planner#roadmaps",
    iconAlt: "Roadmap icon"
  },
  {
    icon: Layers,
    title: "Adaptive Learning Paths",
    description: "Dynamic learning modules that adjust to your progress.",
    link: "/planner#learning",
    iconAlt: "Layered learning icon"
  },
  {
    icon: Bot,
    title: "Real-Time AI Coaching",
    description: "Instant guidance and feedback powered by AI.",
    link: "/planner#coaching",
    iconAlt: "AI coaching icon"
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Track your growth with intuitive analytics.",
    link: "/planner#analytics",
    iconAlt: "Analytics icon"
  },
  {
    icon: Plug,
    title: "Seamless Integrations",
    description: "Connect with your favorite tools and platforms effortlessly.",
    link: "/planner#integrations",
    iconAlt: "Integration plug icon"
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
            <Link
              key={feature.link}
              to={feature.link}
              className="group block hover:shadow-lg hover:shadow-brand-primary/10 transition-all duration-300 rounded-lg"
              aria-label={feature.title}
            >
              <Card className="h-full border-border/50 group-hover:border-brand-primary/30">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-full h-full text-white" aria-hidden="true" />
                    <span className="sr-only">{feature.iconAlt}</span>
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;