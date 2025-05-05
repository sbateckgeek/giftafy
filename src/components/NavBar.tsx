
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  isExternal?: boolean;
};

const NavLink = ({ href, children, onClick, isExternal = false }: NavLinkProps) => {
  const linkContent = (
    <span className="text-white/80 hover:text-primary font-light px-4 py-2 transition-colors duration-200">
      {children}
    </span>
  );
  
  return isExternal ? (
    <a href={href} onClick={onClick} className="text-white/80 hover:text-primary font-light px-4 py-2 transition-colors duration-200">
      {children}
    </a>
  ) : (
    <Link to={href} onClick={onClick} className="text-white/80 hover:text-primary font-light px-4 py-2 transition-colors duration-200">
      {children}
    </Link>
  );
};

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", isExternal: false },
    { name: "Gift Finder", href: "/gift-finder", isExternal: false },
    { name: "Features", href: "/#features", isExternal: true },
    { name: "How It Works", href: "/#how-it-works", isExternal: true },
    { name: "Pricing", href: "/#pricing", isExternal: true },
    { name: "FAQ", href: "/#faq", isExternal: true }
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={cn(
      "sticky-nav",
      isScrolled && "scrolled"
    )}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-light tracking-tight text-white">
            <span className="text-primary">Gift</span>afy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1 items-center">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              href={link.href} 
              isExternal={link.isExternal}
            >
              {link.name}
            </NavLink>
          ))}
          <Link to="/gift-finder">
            <Button className="neomorphic-button ml-4">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-[80%] max-w-sm bg-background/95 backdrop-blur-lg z-50 shadow-xl transition-transform duration-300 ease-in-out transform md:hidden glass-card",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-end p-6">
          <button onClick={closeMobileMenu}>
            <X size={24} className="text-white" />
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-6">
          {navLinks.map((link) => (
            <NavLink 
              key={link.name} 
              href={link.href} 
              onClick={closeMobileMenu}
              isExternal={link.isExternal}
            >
              {link.name}
            </NavLink>
          ))}
          <Link to="/gift-finder" onClick={closeMobileMenu}>
            <Button className="neomorphic-button mt-4 w-full">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
