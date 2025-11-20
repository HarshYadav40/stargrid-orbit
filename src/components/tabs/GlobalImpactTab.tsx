import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Globe } from "lucide-react";

const GlobalImpactTab = () => {
  const [inputs, setInputs] = useState({
    region: "United States",
    dailyDemand: 12000,
    satellites: 50,
  });

  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    // Simplified calculation
    const powerPerSatellite = 0.2; // GW per satellite (simplified)
    const totalStarGridPower = inputs.satellites * powerPerSatellite * 24; // GWh per day
    
    const coverage = Math.min((totalStarGridPower / inputs.dailyDemand) * 100, 100);
    const co2Avoided = Math.floor((totalStarGridPower * 1000 * 365 * 1000) / 1000);
    const dataCenters = Math.floor(inputs.satellites * 2.5);

    setResults({
      coverage: coverage.toFixed(1),
      co2Avoided,
      dataCenters,
      chartData: [
        { name: "StarGrid", value: parseFloat(coverage.toFixed(1)) },
        { name: "Other Sources", value: parseFloat((100 - coverage).toFixed(1)) },
      ],
    });
  };

  const COLORS = ["hsl(var(--primary))", "hsl(var(--muted))"];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <Card className="p-8 bg-gradient-to-br from-card to-muted/20 border-primary/20">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">Global Impact Assessment</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <Label className="text-sm text-muted-foreground">Region / Country</Label>
            <Input
              type="text"
              value={inputs.region}
              onChange={(e) => setInputs({ ...inputs, region: e.target.value })}
              className="mt-2 bg-muted/50"
            />
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Daily Energy Demand (GWh)</Label>
            <Input
              type="number"
              value={inputs.dailyDemand}
              onChange={(e) => setInputs({ ...inputs, dailyDemand: Number(e.target.value) })}
              className="mt-2 bg-muted/50"
            />
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Number of StarGrid Satellites</Label>
            <Input
              type="number"
              value={inputs.satellites}
              onChange={(e) => setInputs({ ...inputs, satellites: Number(e.target.value) })}
              className="mt-2 bg-muted/50"
            />
          </div>
        </div>

        <Button onClick={calculate} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
          Calculate Impact
        </Button>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-8 bg-gradient-to-br from-card to-muted/20 border-primary/20">
            <h3 className="text-xl font-semibold mb-6 text-primary">Impact Summary</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">Energy Demand Coverage</p>
                <p className="text-4xl font-bold text-primary">{results.coverage}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CO₂ Avoided per Year</p>
                <p className="text-3xl font-bold text-success">{results.co2Avoided.toLocaleString()} tons</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data Centers Fully Powered</p>
                <p className="text-3xl font-bold text-accent">{results.dataCenters}</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-card to-muted/20 border-primary/20">
            <h3 className="text-xl font-semibold mb-4 text-primary">Energy Mix</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={results.chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {results.chartData.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GlobalImpactTab;
