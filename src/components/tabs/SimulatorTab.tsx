import { useState, useMemo } from "react";
import ControlPanel, { SimulatorConfig } from "../simulator/ControlPanel";
import Visualization from "../simulator/Visualization";
import MetricsDisplay from "../simulator/MetricsDisplay";

const SimulatorTab = () => {
  const [config, setConfig] = useState<SimulatorConfig>({
    satellites: 10,
    orbit: "LEO",
    panelArea: 5000,
    efficiency: 30,
    dataCenterAllocation: 40,
    dataCenterLoad: 500,
  });

  const metrics = useMemo(() => {
    // Solar constant in space: ~1361 W/m²
    const solarIntensity = 1361; // W/m²
    
    // Calculate raw power per satellite
    const powerPerSatellite = (config.panelArea * solarIntensity * config.efficiency) / 100000000; // Convert to GW
    
    // Total power collected
    const totalPower = powerPerSatellite * config.satellites;
    
    // Power distribution
    const dataCenterPower = (totalPower * config.dataCenterAllocation) / 100;
    const earthPower = totalPower - dataCenterPower;
    
    // Average US household uses ~10,000 kWh/year = ~1.14 kW continuous
    const householdsPowered = Math.floor((earthPower * 1000000) / 1.14);
    
    // Coal power plant emits ~1000 kg CO₂ per MWh
    // Assume 8760 hours per year
    const co2Avoided = Math.floor((earthPower * 1000 * 8760 * 1000) / 1000);
    
    return {
      totalPower,
      dataCenterPower,
      earthPower,
      householdsPowered,
      co2Avoided,
    };
  }, [config]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ControlPanel config={config} onChange={setConfig} />
        </div>
        <div className="lg:col-span-2">
          <Visualization 
            satellites={config.satellites}
            dataCenterAllocation={config.dataCenterAllocation}
          />
        </div>
      </div>
      
      <MetricsDisplay metrics={metrics} />
    </div>
  );
};

export default SimulatorTab;
