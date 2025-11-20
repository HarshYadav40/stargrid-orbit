import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Server, Thermometer, Activity, HardDrive } from "lucide-react";

const DataCenterTab = () => {
  const powerData = [
    { hour: "00:00", power: 450 },
    { hour: "04:00", power: 380 },
    { hour: "08:00", power: 520 },
    { hour: "12:00", power: 650 },
    { hour: "16:00", power: 720 },
    { hour: "20:00", power: 580 },
    { hour: "24:00", power: 450 },
  ];

  const stats = [
    {
      label: "Power Allocated",
      value: "2.4 GW",
      icon: Activity,
      status: "Nominal",
      color: "text-primary",
    },
    {
      label: "Compute Usage",
      value: "87%",
      icon: Server,
      status: "High",
      color: "text-accent",
    },
    {
      label: "Active Racks",
      value: "1,247",
      icon: HardDrive,
      status: "Online",
      color: "text-success",
    },
    {
      label: "Avg Temperature",
      value: "-45°C",
      icon: Thermometer,
      status: "Optimal",
      color: "text-foreground",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <Card className="p-8 bg-gradient-to-br from-card to-muted/20 border-primary/20">
        <h2 className="text-2xl font-bold text-primary mb-6">Space Data Center Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-muted/30 border-border">
              <div className="flex items-center gap-3 mb-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <h3 className="text-sm text-muted-foreground font-medium">{stat.label}</h3>
              </div>
              <p className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">Status: {stat.status}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-muted/30 border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Power Usage (Last 24 Hours)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={powerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Line 
                type="monotone" 
                dataKey="power" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-primary/20">
          <h3 className="text-sm text-muted-foreground mb-2">Latency to Earth</h3>
          <p className="text-3xl font-bold text-primary">23 ms</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-accent/20">
          <h3 className="text-sm text-muted-foreground mb-2">Data Processed/Day</h3>
          <p className="text-3xl font-bold text-accent">847 PB</p>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-success/20">
          <h3 className="text-sm text-muted-foreground mb-2">AI Jobs Running</h3>
          <p className="text-3xl font-bold text-success">12,456</p>
        </Card>
      </div>
    </div>
  );
};

export default DataCenterTab;
