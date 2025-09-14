import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
const AboutSection = () => {
  const { t } = useI18n();
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center space-y-6">
        <h2 className="text-4xl font-bold">{t("About")}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t("Learn more about our mission, leadership team, and press resources.")}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/about#mission" className="text-brand-primary underline" aria-label={t("Company Mission")}>
            {t("Company Mission")}
          </Link>
          <Link to="/about#team" className="text-brand-primary underline" aria-label={t("Leadership")}>
            {t("Leadership")}
          </Link>
          <Link to="/about#press" className="text-brand-primary underline" aria-label={t("Press Kit")}>
            {t("Press Kit")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

