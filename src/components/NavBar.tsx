
import React, { useState, useEffect } from 'react';
import { Menu, X, User, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  isExternal?: boolean;
  className?: string;
  isActive?: boolean;
};

const NavLink = ({ href, children, onClick, isExternal = false, className, isActive }: NavLinkProps) => {
  const linkContent = (
    <span className={cn(
      "text-white/80 hover:text-primary font-light px-4 py-2 transition-colors duration-200",
      isActive && "text-primary",
      className
    )}>
      {children}
    </span>
  );
  
  return isExternal ? (
    <a 
      href={href} 
      onClick={onClick} 
      className={cn(
        "text-white/80 hover:text-primary font-light px-4 py-2 transition-colors duration-200",
        isActive && "text-primary",
        className
      )}
    >
      {children}
    </a>
  ) : (
    <Link 
      to={href} 
      onClick={onClick} 
      className={cn(
        "text-white/80 hover:text-primary font-light px-4 py-2 transition-colors duration-200",
        isActive && "text-primary",
        className
      )}
    >
      {children}
    </Link>
  );
};

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [secondaryMenuOpen, setSecondaryMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Check if user is logged in
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    
    getUser();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out');
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const primaryNavLinks = [
    { name: "Home", href: "/", isExternal: false },
    { name: "Gift Finder", href: "/gift-finder", isExternal: false },
    { name: "Features", href: "/#features", isExternal: true },
    { name: "How It Works", href: "/#how-it-works", isExternal: true },
    { name: "Pricing", href: "/#pricing", isExternal: true },
    { name: "FAQ", href: "/#faq", isExternal: true }
  ];
  
  const secondaryNavLinks = [
    { name: "About Us", href: "/about", isExternal: false },
    { name: "Blog", href: "/blog", isExternal: false },
    { name: "Contact", href: "/contact", isExternal: false }
  ];
  
  // Add Dashboard link if user is logged in
  if (user) {
    primaryNavLinks.push({ name: "Dashboard", href: "/dashboard", isExternal: false });
  }

  const renderMobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu size={24} className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-background/95 backdrop-blur-lg border-white/10 pt-12">
        <div className="flex flex-col space-y-4 p-2">
          {primaryNavLinks.map((link) => (
            <NavLink 
              key={link.name} 
              href={link.href} 
              isExternal={link.isExternal}
              isActive={isActive(link.href)}
            >
              {link.name}
            </NavLink>
          ))}
          
          <div className="border-t border-white/10 my-2 pt-2">
            {secondaryNavLinks.map((link) => (
              <NavLink 
                key={link.name} 
                href={link.href} 
                isExternal={link.isExternal}
                isActive={isActive(link.href)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          
          {user ? (
            <>
              <Link to="/dashboard" className="w-full">
                <Button className="neomorphic-button mt-4 w-full">
                  <User size={16} className="mr-2" />
                  Account
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="w-full" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/auth" className="w-full">
              <Button className="neomorphic-button mt-4 w-full">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

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

        {/* Mobile Navigation */}
        {isMobile && renderMobileMenu()}

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex space-x-1 items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Primary Navigation */}
                {primaryNavLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavLink 
                      href={link.href} 
                      isExternal={link.isExternal} 
                      isActive={isActive(link.href)}
                    >
                      {link.name}
                    </NavLink>
                  </NavigationMenuItem>
                ))}
                
                {/* Secondary Navigation dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-4 py-2 text-white/80 hover:text-primary data-[state=open]:text-primary">
                    More
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background/95 backdrop-blur-lg border-white/10 rounded-md p-1">
                    <ul className="grid w-[200px]">
                      {secondaryNavLinks.map((link) => (
                        <li key={link.name}>
                          <NavigationMenuLink asChild>
                            <NavLink 
                              href={link.href} 
                              isExternal={link.isExternal}
                              className="block w-full hover:bg-white/5 rounded-md"
                              isActive={isActive(link.href)}
                            >
                              {link.name}
                            </NavLink>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {user ? (
              <div className="flex items-center space-x-2 ml-4">
                <Button 
                  className="neomorphic-button"
                  onClick={() => navigate('/dashboard')}
                >
                  <User size={16} className="mr-2" />
                  Account
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button className="neomorphic-button ml-4">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
