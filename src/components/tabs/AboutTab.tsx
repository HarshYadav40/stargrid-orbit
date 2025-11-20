import { Card } from "@/components/ui/card";
import { Satellite, Database, Leaf, Info } from "lucide-react";
import heroSpace from "@/assets/hero-space.jpg";

const AboutTab = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Card className="overflow-hidden bg-gradient-to-br from-card to-muted/20 border-primary/20">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={heroSpace} 
            alt="Space-based solar power visualization" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        </div>
        
        <div className="p-8">
          <h2 className="text-3xl font-bold text-primary mb-6">About StarGrid</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Satellite className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Space-Based Solar Power</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Space-Based Solar Power (SBSP) is a concept of collecting solar power in space and 
                  transmitting it to Earth. Satellites equipped with large solar arrays collect energy 
                  24/7 without atmospheric interference or day-night cycles. This energy is converted to 
                  microwaves or lasers and beamed down to receiving stations (rectennas) on Earth, where 
                  it's converted back to electricity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Database className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Orbital Data Centers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Space data centers leverage the vacuum of space for superior cooling and access to 
                  unlimited solar power. Without atmospheric heat dissipation challenges, servers can 
                  operate more efficiently in the extreme cold of space. These facilities can handle 
                  massive computational workloads for AI, scientific research, and cloud services while 
                  reducing Earth's energy burden.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Leaf className="h-6 w-6 text-success mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Environmental Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  StarGrid represents a clean energy future by eliminating fossil fuel dependency for 
                  power generation and data center operations. By collecting solar energy in space where 
                  it's 24/7 available and 10x more intense, we can power cities and industries while 
                  dramatically reducing global CO₂ emissions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-secondary mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">About This Simulator</h3>
                <p className="text-muted-foreground leading-relaxed">
                  This interactive simulator uses simplified models to demonstrate the potential of 
                  space-based energy systems. All calculations are educational estimates based on current 
                  technology and theoretical projections. Actual implementation would require advanced 
                  engineering, regulatory frameworks, and international cooperation. Use this tool to 
                  explore possibilities and understand the scale of space energy infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-border">
        <h3 className="text-lg font-semibold mb-3 text-primary">Key Assumptions</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Solar intensity in space: 1,361 W/m²</li>
          <li>• Average household power consumption: ~1.14 kW continuous</li>
          <li>• Coal plant emissions: ~1,000 kg CO₂ per MWh</li>
          <li>• Microwave transmission efficiency: 85%</li>
          <li>• Rectenna conversion efficiency: 80%</li>
          <li>• All values are simplified for educational demonstration</li>
        </ul>
      </Card>
    </div>
  );
};

export default AboutTab;
