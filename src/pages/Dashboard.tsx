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

  const quickActions = [
    {
      title: "AI Advisor",
      description: "Chat with your farm assistant",
      icon: MessageSquare,
      path: "/ai-advisor",
      variant: "default" as const,
    },
    {
      title: "Weather",
      description: "7-day forecast & insights",
      icon: CloudRain,
      path: "/weather",
      variant: "accent" as const,
    },
    {
      title: "Calculators",
      description: "Fertilizer & input tools",
      icon: Calculator,
      path: "/calculators",
      variant: "secondary" as const,
    },
    {
      title: "Pest Identifier",
      description: "Diagnose crop issues",
      icon: Bug,
      path: "/pest-identifier",
      variant: "default" as const,
    },
  ];

  const iotAction = {
    title: "IoT Sensors",
    description: "Live field monitoring",
    icon: Radio,
    path: "/iot-dashboard",
    variant: "accent" as const,
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

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Card
                key={action.title}
                className="cursor-pointer hover:shadow-medium transition-shadow"
                onClick={() => navigate(action.path)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg ${
                      action.variant === 'accent' ? 'bg-accent/10' : 
                      action.variant === 'secondary' ? 'bg-secondary/10' : 
                      'bg-primary/10'
                    }`}>
                      <action.icon className={`h-5 w-5 ${
                        action.variant === 'accent' ? 'text-accent' : 
                        action.variant === 'secondary' ? 'text-secondary' : 
                        'text-primary'
                      }`} />
                    </div>
                  </div>
                  <CardTitle className="text-base">{action.title}</CardTitle>
                  <CardDescription className="text-sm">{action.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
            {iotEnabled && (
              <Card
                className="cursor-pointer hover:shadow-medium transition-shadow border-primary/50"
                onClick={() => navigate(iotAction.path)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-primary/10 relative">
                      <iotAction.icon className="h-5 w-5 text-primary" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <CardTitle className="text-base">{iotAction.title}</CardTitle>
                  <CardDescription className="text-sm">{iotAction.description}</CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        </div>

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
