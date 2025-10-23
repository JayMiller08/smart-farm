import { useState, useEffect } from "react";
import { Activity, Droplets, Thermometer, Zap, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SensorData {
  timestamp: string;
  sensors: {
    soilMoisture: { value: number; status: string };
    soilTemperature: { value: number };
    soilPH: { value: number };
    airTemperature: { value: number };
    humidity: { value: number };
    npk: { nitrogen: number; phosphorus: number; potassium: number };
  };
  alerts: Array<{ type: string; message: string; severity: string }>;
}

// Simulated sensor data generator
const generateSensorData = (): SensorData => {
  const soilMoisture = 30 + Math.random() * 30; // 30-60%
  const status = soilMoisture < 35 ? "critical" : soilMoisture < 45 ? "warning" : "optimal";
  
  const alerts = [];
  if (soilMoisture < 35) {
    alerts.push({
      type: "irrigation",
      message: "Soil moisture below optimal range. Consider irrigation.",
      severity: "warning"
    });
  }

  return {
    timestamp: new Date().toISOString(),
    sensors: {
      soilMoisture: { value: soilMoisture, status },
      soilTemperature: { value: 20 + Math.random() * 8 }, // 20-28°C
      soilPH: { value: 6.0 + Math.random() * 1.5 }, // 6.0-7.5
      airTemperature: { value: 22 + Math.random() * 10 }, // 22-32°C
      humidity: { value: 50 + Math.random() * 30 }, // 50-80%
      npk: {
        nitrogen: 40 + Math.random() * 30,
        phosphorus: 20 + Math.random() * 20,
        potassium: 150 + Math.random() * 50
      }
    },
    alerts
  };
};

export default function IoTDashboard() {
  const navigate = useNavigate();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [isLive, setIsLive] = useState(true);

  // Fetch sensor data every 5 seconds when "live"
  useEffect(() => {
    if (!isLive) return;
    
    const fetchData = () => {
      // Simulated API call - replace with actual endpoint
      const data = generateSensorData();
      setSensorData(data);
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Update every 5s

    return () => clearInterval(interval);
  }, [isLive]);

  if (!sensorData) {
    return (
      <div className="min-h-screen bg-muted/30 pb-20 md:pb-6">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading sensor data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-20 md:pb-6">
      <header className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">IoT Sensor Monitoring</h1>
            <p className="text-sm text-muted-foreground">Real-time field data</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-muted'}`} />
            <span className="text-sm hidden sm:inline">{isLive ? 'Live' : 'Paused'}</span>
            <Button
              onClick={() => setIsLive(!isLive)}
              variant="outline"
              size="sm"
            >
              {isLive ? 'Pause' : 'Resume'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Alert Banner */}
        {sensorData.alerts.length > 0 && (
          <Alert className="border-amber-500 bg-amber-50">
            <AlertDescription>
              {sensorData.alerts.map((alert, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-amber-900">{alert.message}</span>
                </div>
              ))}
            </AlertDescription>
          </Alert>
        )}

        {/* Sensor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Soil Moisture */}
          <SensorCard
            icon={<Droplets className="w-6 h-6 text-blue-500" />}
            label="Soil Moisture"
            value={sensorData.sensors.soilMoisture.value.toFixed(1)}
            unit="%"
            status={sensorData.sensors.soilMoisture.status}
            optimal="35-50%"
          />

          {/* Soil Temperature */}
          <SensorCard
            icon={<Thermometer className="w-6 h-6 text-orange-500" />}
            label="Soil Temperature"
            value={sensorData.sensors.soilTemperature.value.toFixed(1)}
            unit="°C"
            status="optimal"
            optimal="18-25°C"
          />

          {/* Soil pH */}
          <SensorCard
            icon={<Activity className="w-6 h-6 text-green-500" />}
            label="Soil pH"
            value={sensorData.sensors.soilPH.value.toFixed(1)}
            unit=""
            status="optimal"
            optimal="6.0-7.0"
          />

          {/* Air Temperature */}
          <SensorCard
            icon={<Thermometer className="w-6 h-6 text-red-500" />}
            label="Air Temperature"
            value={sensorData.sensors.airTemperature.value.toFixed(1)}
            unit="°C"
            status="optimal"
          />

          {/* Humidity */}
          <SensorCard
            icon={<Droplets className="w-6 h-6 text-cyan-500" />}
            label="Humidity"
            value={sensorData.sensors.humidity.value.toFixed(1)}
            unit="%"
            status="optimal"
          />

          {/* NPK Levels */}
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="w-6 h-6 text-purple-500" />
                <span className="font-semibold">NPK Levels</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nitrogen (N):</span>
                  <span className="font-semibold">{sensorData.sensors.npk.nitrogen.toFixed(0)} ppm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phosphorus (P):</span>
                  <span className="font-semibold">{sensorData.sensors.npk.phosphorus.toFixed(0)} ppm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Potassium (K):</span>
                  <span className="font-semibold">{sensorData.sensors.npk.potassium.toFixed(0)} ppm</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historical Chart Placeholder */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>24-Hour Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-muted/50 rounded flex items-center justify-center text-muted-foreground">
              Chart: Soil Moisture & Temperature trends
            </div>
          </CardContent>
        </Card>

        {/* Timestamp */}
        <div className="text-xs text-muted-foreground text-center">
          Last updated: {new Date(sensorData.timestamp).toLocaleString()}
        </div>
      </main>
    </div>
  );
}

// Reusable Sensor Card Component
function SensorCard({ icon, label, value, unit, status, optimal }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  status: string;
  optimal?: string;
}) {
  const statusStyles = {
    optimal: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  };

  return (
    <Card className="shadow-soft">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <span className="font-semibold text-sm">{label}</span>
        </div>
        <div className="text-3xl font-bold mb-1">
          {value}<span className="text-lg text-muted-foreground">{unit}</span>
        </div>
        {optimal && (
          <div className="text-xs text-muted-foreground mb-2">Optimal: {optimal}</div>
        )}
        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </CardContent>
    </Card>
  );
}
