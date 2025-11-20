import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface SimulatorConfig {
  satellites: number;
  orbit: "LEO" | "MEO" | "GEO";
  panelArea: number;
  efficiency: number;
  dataCenterAllocation: number;
  dataCenterLoad: number;
}

interface ControlPanelProps {
  config: SimulatorConfig;
  onChange: (config: SimulatorConfig) => void;
}

const ControlPanel = ({ config, onChange }: ControlPanelProps) => {
  const updateConfig = (key: keyof SimulatorConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-primary/20">
        <h3 className="text-lg font-semibold mb-4 text-primary">Satellite Configuration</h3>
        
        <div className="space-y-6">
          <div>
            <Label className="text-sm text-muted-foreground">Number of Satellites: {config.satellites}</Label>
            <Slider
              value={[config.satellites]}
              onValueChange={([value]) => updateConfig("satellites", value)}
              min={1}
              max={20}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Orbit Type</Label>
            <Select value={config.orbit} onValueChange={(value) => updateConfig("orbit", value)}>
              <SelectTrigger className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="LEO">LEO (Low Earth Orbit)</SelectItem>
                <SelectItem value="MEO">MEO (Medium Earth Orbit)</SelectItem>
                <SelectItem value="GEO">GEO (Geostationary Orbit)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Solar Panel Area: {config.panelArea} m²</Label>
            <Slider
              value={[config.panelArea]}
              onValueChange={([value]) => updateConfig("panelArea", value)}
              min={100}
              max={10000}
              step={100}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Solar Cell Efficiency: {config.efficiency}%</Label>
            <Slider
              value={[config.efficiency]}
              onValueChange={([value]) => updateConfig("efficiency", value)}
              min={10}
              max={50}
              step={1}
              className="mt-2"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-card to-card/80 border-secondary/20">
        <h3 className="text-lg font-semibold mb-4 text-secondary">Power Distribution</h3>
        
        <div className="space-y-6">
          <div>
            <Label className="text-sm text-muted-foreground">
              Data Center Allocation: {config.dataCenterAllocation}%
            </Label>
            <Slider
              value={[config.dataCenterAllocation]}
              onValueChange={([value]) => updateConfig("dataCenterAllocation", value)}
              min={0}
              max={100}
              step={5}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Earth: {100 - config.dataCenterAllocation}%
            </p>
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">
              Data Center Load: {config.dataCenterLoad} MW
            </Label>
            <Slider
              value={[config.dataCenterLoad]}
              onValueChange={([value]) => updateConfig("dataCenterLoad", value)}
              min={10}
              max={1000}
              step={10}
              className="mt-2"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ControlPanel;
