import { Button } from "@/components/ui/button";
import { Brain, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n, Lang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const Header = () => {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="PersonaPath AI Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold">PersonaPath AI</span>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("Home")}
            </Link>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("How It Works")}
            </a>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("Features")}
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("About")}
            </a>
          </nav>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/signin" aria-label={t("Sign In")}>{t("Sign In")}</Link>
            </Button>
            <Button variant="brand" asChild>
              <Link to="/signup" aria-label={t("Get Started")}>{t("Get Started")}</Link>
            </Button>
            <Button variant="ghost" onClick={toggle} aria-label={theme === "dark" ? t("Switch to Light Mode") : t("Switch to Dark Mode")}>
              {theme === "dark" ? t("Light Mode") : t("Dark Mode")}
            </Button>
            <select
              className="bg-transparent border rounded px-2 py-1"
              value={lang}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLang(e.target.value as Lang)}
              aria-label="Language selector"
            >
              <option value="en">EN</option>
              <option value="zh">中文</option>
              <option value="ko">한국어</option>
            </select>
          </div>
          
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;