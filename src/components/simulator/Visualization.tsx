import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface VisualizationProps {
  satellites: number;
  dataCenterAllocation: number;
}

const Visualization = ({ satellites, dataCenterAllocation }: VisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw space background
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Earth
      const earthRadius = 60;
      const earthGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, earthRadius);
      earthGradient.addColorStop(0, "hsl(188, 94%, 55%)");
      earthGradient.addColorStop(0.5, "hsl(142, 76%, 45%)");
      earthGradient.addColorStop(1, "hsl(210, 100%, 30%)");
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.fillStyle = earthGradient;
      ctx.fill();
      ctx.strokeStyle = "hsl(188, 94%, 70%)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw orbit paths
      const orbitRadii = [120, 160, 200];
      orbitRadii.forEach((radius) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "hsl(210, 50%, 20%)";
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw satellites
      const orbitRadius = 140;
      for (let i = 0; i < satellites; i++) {
        const angle = (rotation + (i * (360 / satellites))) * (Math.PI / 180);
        const satX = centerX + Math.cos(angle) * orbitRadius;
        const satY = centerY + Math.sin(angle) * orbitRadius;

        // Satellite body
        ctx.beginPath();
        ctx.arc(satX, satY, 6, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(188, 94%, 55%)";
        ctx.fill();
        
        // Solar panels
        ctx.fillStyle = "hsl(188, 94%, 70%)";
        ctx.fillRect(satX - 12, satY - 2, 8, 4);
        ctx.fillRect(satX + 4, satY - 2, 8, 4);

        // Energy beam to data center
        if (dataCenterAllocation > 0) {
          const dcAngle = angle + Math.PI / 4;
          const dcX = centerX + Math.cos(dcAngle) * (orbitRadius + 40);
          const dcY = centerY + Math.sin(dcAngle) * (orbitRadius + 40);
          
          const gradient = ctx.createLinearGradient(satX, satY, dcX, dcY);
          gradient.addColorStop(0, "rgba(33, 150, 243, 0.8)");
          gradient.addColorStop(1, "rgba(33, 150, 243, 0.2)");
          
          ctx.beginPath();
          ctx.moveTo(satX, satY);
          ctx.lineTo(dcX, dcY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Energy beam to Earth
        const earthBeamIntensity = (100 - dataCenterAllocation) / 100;
        if (earthBeamIntensity > 0) {
          const gradient = ctx.createLinearGradient(satX, satY, centerX, centerY);
          gradient.addColorStop(0, `rgba(76, 175, 80, ${earthBeamIntensity * 0.8})`);
          gradient.addColorStop(1, `rgba(76, 175, 80, 0.1)`);
          
          ctx.beginPath();
          ctx.moveTo(satX, satY);
          ctx.lineTo(centerX + (satX - centerX) * 0.5, centerY + (satY - centerY) * 0.5);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      rotation += 0.5;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [satellites, dataCenterAllocation]);

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-primary/20 h-full">
      <h3 className="text-lg font-semibold mb-4 text-primary">Orbital Visualization</h3>
      <div className="flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">Solar Power Collection</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-muted-foreground">Power to Data Centers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-muted-foreground">Power to Earth Grid</span>
        </div>
      </div>
    </Card>
  );
};

export default Visualization;
