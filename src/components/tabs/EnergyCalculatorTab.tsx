import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calculator } from "lucide-react";

const EnergyCalculatorTab = () => {
  const [inputs, setInputs] = useState({
    panelArea: 5000,
    solarIntensity: 1361,
    panelEfficiency: 30,
    transmissionEfficiency: 85,
    rectennaEfficiency: 80,
  });

  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const rawPower = (inputs.panelArea * inputs.solarIntensity * inputs.panelEfficiency) / 100000000; // GW
    const afterTransmission = rawPower * (inputs.transmissionEfficiency / 100);
    const delivered = afterTransmission * (inputs.rectennaEfficiency / 100);
    
    const householdsPowered = Math.floor((delivered * 1000000) / 1.14);
    const coalPlantsOffset = (delivered / 0.5).toFixed(2); // Assume 500 MW coal plant

    setResults({
      rawPower: rawPower.toFixed(3),
      delivered: delivered.toFixed(3),
      householdsPowered,
      coalPlantsOffset,
      chartData: [
        { name: "Generated", value: parseFloat(rawPower.toFixed(3)) },
        { name: "After Transmission", value: parseFloat(afterTransmission.toFixed(3)) },
        { name: "Delivered", value: parseFloat(delivered.toFixed(3)) },
      ],
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <Card className="p-8 bg-gradient-to-br from-card to-muted/20 border-primary/20">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">Energy Calculator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label className="text-sm text-muted-foreground">Panel Area (m²)</Label>
            <Input
              type="number"
              value={inputs.panelArea}
              onChange={(e) => setInputs({ ...inputs, panelArea: Number(e.target.value) })}
              className="mt-2 bg-muted/50"
            />
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Solar Intensity (W/m²)</Label>
            <Input
              type="number"
              value={inputs.solarIntensity}
              onChange={(e) => setInputs({ ...inputs, solarIntensity: Number(e.target.value) })}
              className="mt-2 bg-muted/50"
            />
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Panel Efficiency (%)</Label>
            <Input
              type="number"
              value={inputs.panelEfficiency}
              onChange={(e) => setInputs({ ...inputs, panelEfficiency: Number(e.target.value) })}
              className="mt-2 bg-muted/50"
            />
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Transmission Efficiency (%)</Label>
            <Input
              type="number"
              value={inputs.transmissionEfficiency}
              onChange={(e) => setInputs({ ...inputs, transmissionEfficiency: Number(e.target.value) })}
              className="mt-2 bg-muted/50"
            />
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Rectenna Efficiency (%)</Label>
            <Input
              type="number"
              value={inputs.rectennaEfficiency}
              onChange={(e) => setInputs({ ...inputs, rectennaEfficiency: Number(e.target.value) })}
              className="mt-2 bg-muted/50"
            />
          </div>
        </div>

        <Button onClick={calculate} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
          Calculate
        </Button>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-8 bg-gradient-to-br from-card to-muted/20 border-primary/20">
            <h3 className="text-xl font-semibold mb-4 text-primary">Results</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Raw Solar Power</p>
                <p className="text-2xl font-bold text-primary">{results.rawPower} GW</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Power Delivered to Grid</p>
                <p className="text-2xl font-bold text-success">{results.delivered} GW</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Households Powered</p>
                <p className="text-2xl font-bold text-foreground">{results.householdsPowered.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Coal Plants Offset</p>
                <p className="text-2xl font-bold text-success">{results.coalPlantsOffset}</p>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-card to-muted/20 border-primary/20">
            <h3 className="text-xl font-semibold mb-4 text-primary">Power Flow</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={results.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnergyCalculatorTab;
