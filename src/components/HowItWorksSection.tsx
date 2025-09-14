import { Link } from "react-router-dom";
import { UserPlus, Brain, MessageSquare, BarChart3 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const HowItWorksSection = () => {
  const { t } = useI18n();
  const steps = [
    {
      icon: UserPlus,
      title: t("Create Your Profile"),
      description: t("Answer a few questions to get started with your personalized journey."),
      link: "/signup",
      iconAlt: t("User profile icon"),
    },
    {
      icon: Brain,
      title: t("AI-Generated Roadmap"),
      description: t("Receive a tailored roadmap built around your goals and skills."),
      link: "/planner",
      iconAlt: t("AI brain icon"),
    },
    {
      icon: MessageSquare,
      title: t("Continuous Guidance"),
      description: t("Get real-time support and advice whenever you need it."),
      link: "/support",
      iconAlt: t("Chat guidance icon"),
    },
    {
      icon: BarChart3,
      title: t("Track Progress"),
      description: t("Monitor your achievements and stay motivated along the way."),
      link: "/dashboard",
      iconAlt: t("Progress chart icon"),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("How")}{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              {t("It Works")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("Our streamlined process connects you with the guidance you need.")}
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          {steps.map((step) => (
            <Link
              key={step.link}
              to={step.link}
              className="group text-center space-y-4"
              aria-label={step.title}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
                <step.icon className="w-8 h-8 text-white" aria-hidden="true" />
                <span className="sr-only">{step.iconAlt}</span>
              </div>
              <h3 className="text-xl font-semibold group-hover:text-brand-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

