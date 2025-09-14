import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import { useI18n } from "@/lib/i18n";

const HeroSection = () => {
  const { t } = useI18n();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-medium">{t("AI-Powered Career Intelligence")}</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {t("Your")}{" "}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              {t("Personal Path")}
            </span>{" "}
            {t("to Success")}
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("Get hyper-personalized career, education, and skill development roadmaps tailored to your unique personality, skills, and life goals.")}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/signup" aria-label={t("Start Your Journey")}>
                {t("Start Your Journey")}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/demo" aria-label={t("Watch Demo")}>{t("Watch Demo")}</Link>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary">50K+</div>
              <div className="text-muted-foreground">{t("Career Paths Created")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary">95%</div>
              <div className="text-muted-foreground">{t("User Satisfaction")}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-primary">24/7</div>
              <div className="text-muted-foreground">{t("AI Guidance Available")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;