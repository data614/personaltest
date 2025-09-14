import { Link } from "react-router-dom";

const AboutSection = () => (
  <section id="about" className="py-24 bg-background">
    <div className="container mx-auto px-4 text-center space-y-6">
      <h2 className="text-4xl font-bold">About</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Learn more about our mission, leadership team, and press resources.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <Link to="/about#mission" className="text-brand-primary underline" aria-label="Company Mission">
          Company Mission
        </Link>
        <Link to="/about#team" className="text-brand-primary underline" aria-label="Leadership">
          Leadership
        </Link>
        <Link to="/about#press" className="text-brand-primary underline" aria-label="Press Kit">
          Press Kit
        </Link>
      </div>
    </div>
  </section>
);

export default AboutSection;

