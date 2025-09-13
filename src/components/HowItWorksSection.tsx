import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, Route, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Smart Assessment",
    description: "Take our comprehensive AI-driven assessment that goes beyond traditional career tests to understand your unique profile.",
    details: ["Personality analysis", "Skills evaluation", "Goal identification", "Values alignment"]
  },
  {
    icon: Search,
    title: "AI Analysis",
    description: "Our advanced AI processes your responses to identify patterns, strengths, and opportunities tailored to you.",
    details: ["Deep learning algorithms", "Pattern recognition", "Market insights", "Trend analysis"]
  },
  {
    icon: Route,
    title: "Custom Roadmap",
    description: "Receive a detailed, actionable roadmap with specific steps, resources, and timelines for your success.",
    details: ["Step-by-step plan", "Resource recommendations", "Timeline milestones", "Skill development paths"]
  },
  {
    icon: Rocket,
    title: "Continuous Growth",
    description: "Your roadmap adapts as you progress, with ongoing AI guidance to keep you on track and motivated.",
    details: ["Progress tracking", "Dynamic updates", "Real-time guidance", "Achievement recognition"]
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our proven 4-step process transforms your career aspirations into actionable reality
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 top-32 w-px h-24 bg-gradient-to-b from-brand-primary to-brand-secondary opacity-30 -translate-x-px" />
              )}
              
              <div className={`flex flex-col lg:flex-row items-center gap-8 mb-16 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Content */}
                <div className="flex-1 lg:max-w-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Icon Card */}
                <div className="flex-1 lg:max-w-md">
                  <Card className="p-8 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/10 transition-all duration-300">
                    <CardContent className="p-0 text-center">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary p-6">
                        <step.icon className="w-full h-full text-white" />
                      </div>
                      <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                      <p className="text-muted-foreground">
                        Step {index + 1} of our personalized journey
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Start Your Assessment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;