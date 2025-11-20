import { useState } from "react";
import Navbar from "@/components/Navbar";
import SimulatorTab from "@/components/tabs/SimulatorTab";
import EnergyCalculatorTab from "@/components/tabs/EnergyCalculatorTab";
import DataCenterTab from "@/components/tabs/DataCenterTab";
import GlobalImpactTab from "@/components/tabs/GlobalImpactTab";
import AboutTab from "@/components/tabs/AboutTab";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Simulator");

  const renderTab = () => {
    switch (activeTab) {
      case "Simulator":
        return <SimulatorTab />;
      case "Energy Calculator":
        return <EnergyCalculatorTab />;
      case "Data Center":
        return <DataCenterTab />;
      case "Global Impact":
        return <GlobalImpactTab />;
      case "About":
        return <AboutTab />;
      default:
        return <SimulatorTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8">
        {renderTab()}
      </main>

      <footer className="border-t border-border bg-card/50 backdrop-blur mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Concept: Space-based solar power + orbital data centers | StarGrid Demo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
