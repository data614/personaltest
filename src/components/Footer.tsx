import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-border/50">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} PersonaPath AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
