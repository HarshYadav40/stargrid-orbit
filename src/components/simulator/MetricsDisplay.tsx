import { Card } from "@/components/ui/card";
import { Zap, Database, Home, Leaf } from "lucide-react";

interface SimulatorMetrics {
  totalPower: number;
  dataCenterPower: number;
  earthPower: number;
  householdsPowered: number;
  co2Avoided: number;
}

interface MetricsDisplayProps {
  metrics: SimulatorMetrics;
}

const MetricsDisplay = ({ metrics }: MetricsDisplayProps) => {
  const metricCards = [
    {
      label: "Total Power Collected",
      value: `${metrics.totalPower.toFixed(2)} GW`,
      icon: Zap,
      color: "text-primary",
      glow: "glow-primary",
    },
    {
      label: "Data Center Power",
      value: `${metrics.dataCenterPower.toFixed(2)} GW`,
      icon: Database,
      color: "text-accent",
      glow: "",
    },
    {
      label: "Power to Earth",
      value: `${metrics.earthPower.toFixed(2)} GW`,
      icon: Zap,
      color: "text-success",
      glow: "glow-success",
    },
    {
      label: "Households Powered",
      value: metrics.householdsPowered.toLocaleString(),
      icon: Home,
      color: "text-foreground",
      glow: "",
    },
    {
      label: "CO₂ Avoided (tons/year)",
      value: metrics.co2Avoided.toLocaleString(),
      icon: Leaf,
      color: "text-success",
      glow: "",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {metricCards.map((metric, index) => (
        <Card
          key={index}
          className={`p-6 bg-gradient-to-br from-card to-muted/20 border-border hover:border-primary/40 transition-all ${metric.glow}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <metric.icon className={`h-5 w-5 ${metric.color}`} />
            <h4 className="text-sm text-muted-foreground font-medium">{metric.label}</h4>
          </div>
          <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
        </Card>
      ))}
    </div>
  );
};

export default MetricsDisplay;
