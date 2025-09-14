import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-border/50">
      <div className="container mx-auto px-4 py-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4 text-sm">
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/">Home</Link></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/careers">Careers</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/cookies">Cookie Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com" aria-label="LinkedIn"><Linkedin className="h-5 w-5" aria-hidden="true" /></a>
            <a href="https://twitter.com" aria-label="Twitter"><Twitter className="h-5 w-5" aria-hidden="true" /></a>
            <a href="https://www.youtube.com" aria-label="YouTube"><Youtube className="h-5 w-5" aria-hidden="true" /></a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Newsletter</h3>
          <form action="/newsletter" className="flex flex-col sm:flex-row gap-2">
            <Input type="email" placeholder="Email address" aria-label="Email address" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} PersonaPath AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
