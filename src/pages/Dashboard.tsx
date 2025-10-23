import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, CloudRain, Calculator, Bug, Sprout, Bell, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WeatherWidget from "@/components/WeatherWidget";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [iotEnabled, setIotEnabled] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("smartfarm_user");
    if (!user) {
      navigate("/");
    } else {
      setUserName(user.split("@")[0]);
      try {
        const userData = JSON.parse(localStorage.getItem("smartfarm_user") || "{}");
        setIotEnabled(userData.iotEnabled || false);
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, [navigate]);

  // AI-generated farming tips (simulated)
  const farmingTips = [
    {
      title: "Soil Preparation",
      tip: "Test your soil pH before planting. Most crops prefer a pH between 6.0-7.0 for optimal nutrient absorption.",
      icon: Sprout,
    },
    {
      title: "Water Management",
      tip: "Water crops early morning to reduce evaporation. Drip irrigation can save up to 50% more water than traditional methods.",
      icon: CloudRain,
    },
    {
      title: "Pest Control",
      tip: "Inspect crops weekly for early pest detection. Natural predators like ladybugs can help control aphid populations.",
      icon: Bug,
    },
    {
      title: "Fertilizer Timing",
      tip: "Apply nitrogen fertilizers in split doses during the growing season for better nutrient uptake and reduced leaching.",
      icon: Calculator,
    },
  ];

  // Sensor-based tips (simulated based on typical sensor readings)
  const getSensorTips = () => {
    if (!iotEnabled) return [];
    
    return [
      {
        type: "soil_moisture",
        message: "Soil moisture at optimal levels (42%). Continue current irrigation schedule.",
        severity: "success",
      },
      {
        type: "temperature",
        message: "Day/night temperature differential is ideal for crop growth.",
        severity: "success",
      },
      {
        type: "npk",
        message: "Nitrogen levels slightly low. Consider applying 20kg/ha of urea fertilizer this week.",
        severity: "warning",
      },
    ];
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sprout className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Smart Farm</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {userName}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Weather Widget */}
        <WeatherWidget />

        {/* Quick Farming Tips */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Quick Farming Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {farmingTips.map((tip) => (
              <Card key={tip.title} className="shadow-soft">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <tip.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base mb-2">{tip.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {tip.tip}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips From Sensors */}
        {iotEnabled && (
          <Card className="shadow-soft border-primary/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Radio className="h-5 w-5 text-primary" />
                <CardTitle>Tips From Sensors</CardTitle>
              </div>
              <CardDescription>AI insights based on your field data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {getSensorTips().map((tip, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${
                    tip.severity === "success"
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                      : "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
                  }`}
                >
                  <p className="text-sm">{tip.message}</p>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => navigate("/iot-dashboard")}
              >
                View Live Dashboard
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Farm Overview */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Farm Overview</CardTitle>
            <CardDescription>Your registered fields</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Sprout className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="mb-3">No fields registered yet</p>
              <Button onClick={() => navigate("/profile")}>Set Up Farm Profile</Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-large md:hidden">
        <div className="flex items-center justify-around py-2">
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2" onClick={() => navigate("/dashboard")}>
            <Sprout className="h-5 w-5 mb-1" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2" onClick={() => navigate("/weather")}>
            <CloudRain className="h-5 w-5 mb-1" />
            <span className="text-xs">Weather</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2" onClick={() => navigate("/ai-advisor")}>
            <MessageSquare className="h-5 w-5 mb-1" />
            <span className="text-xs">AI</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto py-2" onClick={() => navigate("/calculators")}>
            <Calculator className="h-5 w-5 mb-1" />
            <span className="text-xs">Tools</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
