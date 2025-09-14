import { Link } from "react-router-dom";
import { UserPlus, Brain, MessageSquare, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Answer a few questions to get started with your personalized journey.",
    link: "/signup",
    iconAlt: "User profile icon",
  },
  {
    icon: Brain,
    title: "AI-Generated Roadmap",
    description: "Receive a tailored roadmap built around your goals and skills.",
    link: "/planner",
    iconAlt: "AI brain icon",
  },
  {
    icon: MessageSquare,
    title: "Continuous Guidance",
    description: "Get real-time support and advice whenever you need it.",
    link: "/support",
    iconAlt: "Chat guidance icon",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "Monitor your achievements and stay motivated along the way.",
    link: "/dashboard",
    iconAlt: "Progress chart icon",
  },
];

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          How <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">It Works</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our streamlined process connects you with the guidance you need.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-4">
        {steps.map((step, index) => (
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

export default HowItWorksSection;

