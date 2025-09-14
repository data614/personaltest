import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Layers, Bot, BarChart3, Plug } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const FeaturesSection = () => {
  const { t } = useI18n();
  const features = [
    {
      icon: Map,
      title: t("Personalized Roadmaps"),
      description: t("Tailored career paths to help you reach your unique goals."),
      link: "/planner#roadmaps",
      iconAlt: t("Roadmap icon"),
    },
    {
      icon: Layers,
      title: t("Adaptive Learning Paths"),
      description: t("Dynamic learning modules that adjust to your progress."),
      link: "/planner#learning",
      iconAlt: t("Layered learning icon"),
    },
    {
      icon: Bot,
      title: t("Real-Time AI Coaching"),
      description: t("Instant guidance and feedback powered by AI."),
      link: "/planner#coaching",
      iconAlt: t("AI coaching icon"),
    },
    {
      icon: BarChart3,
      title: t("Progress Analytics"),
      description: t("Track your growth with intuitive analytics."),
      link: "/planner#analytics",
      iconAlt: t("Analytics icon"),
    },
    {
      icon: Plug,
      title: t("Seamless Integrations"),
      description: t("Connect with your favorite tools and platforms effortlessly."),
      link: "/planner#integrations",
      iconAlt: t("Integration plug icon"),
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("Why Choose PersonaPath AI")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("Experience the future of career guidance with our comprehensive AI-driven platform")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
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
