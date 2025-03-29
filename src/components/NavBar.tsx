
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home,
  Calendar,
  DollarSign, 
  Settings,
  Menu,
  X
} from "lucide-react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded bg-navy flex items-center justify-center">
              <span className="text-gold font-bold">FS</span>
            </div>
            <span className="font-bold text-lg text-navy hidden md:inline-block">FidServe</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link to="/benefits" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Calendar size={18} />
            <span>Benefits</span>
          </Link>
          <Link to="/planning" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <DollarSign size={18} />
            <span>Financial Planning</span>
          </Link>
          <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
            <Settings size={18} />
            <span>My Dashboard</span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="hidden md:flex">Sign In</Button>
          <Button className="hidden md:flex">Get Started</Button>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <nav className="container py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/benefits" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <Calendar size={18} />
              <span>Benefits</span>
            </Link>
            <Link 
              to="/planning" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <DollarSign size={18} />
              <span>Financial Planning</span>
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted"
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings size={18} />
              <span>My Dashboard</span>
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Button>
              <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
