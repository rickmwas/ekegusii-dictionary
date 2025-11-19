import { useState } from "react";
import { Menu, X, Heart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-3 md:px-4 h-14 md:h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
            ENCHENGERIA
          </h1>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/">
            <Button
              variant="ghost"
              className={isActive("/") ? "text-accent" : ""}
            >
              Dictionary
            </Button>
          </Link>
          <Link to="/favorites">
            <Button
              variant="ghost"
              className={isActive("/favorites") ? "text-accent" : ""}
            >
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </Button>
          </Link>
          <Link to="/about">
            <Button
              variant="ghost"
              className={isActive("/about") ? "text-accent" : ""}
            >
              <Info className="h-4 w-4 mr-2" />
              About
            </Button>
          </Link>
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background">
            <nav className="flex flex-col gap-4 mt-8">
              <Link to="/" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${isActive("/") ? "text-accent" : ""}`}
                >
                  Dictionary
                </Button>
              </Link>
              <Link to="/favorites" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${isActive("/favorites") ? "text-accent" : ""}`}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </Button>
              </Link>
              <Link to="/about" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${isActive("/about") ? "text-accent" : ""}`}
                >
                  <Info className="h-4 w-4 mr-2" />
                  About
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
