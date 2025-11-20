import { Satellite } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navbar = ({ activeTab, onTabChange }: NavbarProps) => {
  const tabs = [
    "Simulator",
    "Energy Calculator",
    "Data Center",
    "Global Impact",
    "About",
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Satellite className="h-7 w-7 text-primary animate-pulse-glow" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            StarGrid
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              onClick={() => onTabChange(tab)}
              className={`transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-md glow-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
