
import React, { useState, useEffect } from 'react';
import { Menu, X, User, ChevronDown, ChevronUp, Search, Gift, Heart, Settings } from 'lucide-react';
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
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  isExternal?: boolean;
  className?: string;
  isActive?: boolean;
  icon?: React.ReactNode;
};

const NavLink = ({ href, children, onClick, isExternal = false, className, isActive, icon }: NavLinkProps) => {
  const linkClasses = cn(
    "text-white/80 hover:text-primary transition-colors duration-200 flex items-center gap-2 py-2 px-4 rounded-md hover:bg-white/5",
    isActive && "text-primary bg-white/5",
    className
  );
  
  return isExternal ? (
    <a 
      href={href} 
      onClick={onClick} 
      className={linkClasses}
    >
      {icon && <span className="text-primary/80">{icon}</span>}
      {children}
    </a>
  ) : (
    <Link 
      to={href} 
      onClick={onClick} 
      className={linkClasses}
    >
      {icon && <span className="text-primary/80">{icon}</span>}
      {children}
    </Link>
  );
};

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
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
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname === path || location.pathname.startsWith(path);
  };

  // Primary navigation links with icons
  const primaryNavLinks = [
    { name: "Home", href: "/", isExternal: false, icon: <Gift size={18} /> },
    { name: "Gift Finder", href: "/gift-finder", isExternal: false, icon: <Search size={18} /> },
    { name: "Features", href: "/#features", isExternal: true, icon: <Heart size={18} /> },
    { name: "Pricing", href: "/#pricing", isExternal: true, icon: <Settings size={18} /> }
  ];
  
  // Secondary navigation links
  const secondaryNavLinks = [
    { name: "About Us", href: "/about", isExternal: false },
    { name: "Blog", href: "/blog", isExternal: false },
    { name: "Contact", href: "/contact", isExternal: false },
    { name: "FAQ", href: "/#faq", isExternal: true },
    { name: "How It Works", href: "/#how-it-works", isExternal: true }
  ];
  
  // Add Dashboard link if user is logged in
  if (user) {
    primaryNavLinks.push({ name: "Dashboard", href: "/dashboard", isExternal: false, icon: <User size={18} /> });
  }

  // Display breadcrumb navigation for non-home pages
  const renderBreadcrumb = () => {
    if (location.pathname === "/") return null;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) return null;
    
    return (
      <div className="breadcrumb-container">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-white/70 hover:text-white">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/40" />
              {pathSegments.map((segment, index) => {
                const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
                const isLast = index === pathSegments.length - 1;
                
                return (
                  <React.Fragment key={path}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <span className="text-primary font-medium">
                          {segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')}
                        </span>
                      ) : (
                        <BreadcrumbLink href={path} className="text-white/70 hover:text-white">
                          {segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator className="text-white/40" />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    );
  };

  const renderMobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menu" className="md:hidden">
          <Menu size={24} className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-background/95 backdrop-blur-lg border-white/10 pt-12 w-[280px]">
        <div className="flex flex-col space-y-1">
          <div className="mb-4">
            <h3 className="text-sm uppercase font-semibold text-white/50 px-4 mb-2">Main Navigation</h3>
            {primaryNavLinks.map((link) => (
              <NavLink 
                key={link.name} 
                href={link.href} 
                isExternal={link.isExternal}
                isActive={isActive(link.href)}
                icon={link.icon}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm uppercase font-semibold text-white/50 px-4 mb-2">More</h3>
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
          
          <div className="border-t border-white/10 pt-4 mt-2">
            {user ? (
              <div className="space-y-2 px-4">
                <p className="text-sm text-white/60">Signed in as:</p>
                <p className="text-sm font-medium truncate">{user.email}</p>
                <div className="flex gap-2 mt-4">
                  <Button 
                    className="neomorphic-button w-full" 
                    onClick={() => {
                      navigate('/dashboard');
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 px-4">
                <Link to="/auth" className="w-full block">
                  <Button className="neomorphic-button w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?signup=true" className="w-full block">
                  <Button className="secondary-button w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <>
      <nav className={cn(
        "sticky-nav",
        isScrolled && "scrolled"
      )}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-semibold tracking-tight text-white flex items-center gap-1.5">
              <span className="h-8 w-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/80 to-primary">
                <Gift size={20} className="text-background" />
              </span>
              <span>
                <span className="text-primary">Gift</span>afy
              </span>
            </span>
          </Link>

          {/* Mobile Navigation */}
          {isMobile && renderMobileMenu()}

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Primary Navigation */}
                  {primaryNavLinks.map((link) => (
                    <NavigationMenuItem key={link.name}>
                      <NavLink 
                        href={link.href} 
                        isExternal={link.isExternal} 
                        isActive={isActive(link.href)}
                        className="px-3 py-2 rounded-md"
                      >
                        {link.name}
                      </NavLink>
                    </NavigationMenuItem>
                  ))}
                  
                  {/* Fix: Replace NavigationMenu with Popover for "More" dropdown to fix positioning issue */}
                  <NavigationMenuItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="px-3 py-2 text-white/80 hover:text-primary bg-transparent hover:bg-white/5 rounded-md flex items-center gap-1">
                          More <ChevronDown size={16} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="bg-background/95 backdrop-blur-lg border border-white/10 rounded-md p-1 shadow-glow-sm w-[220px] z-50">
                        <ul className="grid gap-1 p-2">
                          {secondaryNavLinks.map((link) => (
                            <li key={link.name}>
                              <NavLink 
                                href={link.href} 
                                isExternal={link.isExternal}
                                className="block w-full hover:bg-white/5 rounded-md"
                                isActive={isActive(link.href)}
                              >
                                {link.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              {user ? (
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/10">
                  <Button 
                    className="neomorphic-button"
                    onClick={() => navigate('/dashboard')}
                  >
                    <User size={16} className="mr-2" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-white/80 hover:text-white border-white/20"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/10">
                  <Link to="/auth">
                    <Button className="neomorphic-button">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth?signup=true">
                    <Button className="secondary-button">
                      Sign Up Free
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      
      {/* Fixed Breadcrumb Navigation positioning */}
      {!isMobile && renderBreadcrumb()}
    </>
  );
};

export default NavBar;
