import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CloudRain, Sun, Wind, Droplets, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Weather = () => {
  const navigate = useNavigate();

  // Mock weather data - will be replaced with OpenWeatherMap API
  const currentWeather = {
    temp: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    wind: 12,
    rainfall: 0,
    feelsLike: 26,
  };

  const forecast = [
    { day: "Mon", high: 26, low: 18, condition: "Sunny", icon: Sun },
    { day: "Tue", high: 28, low: 19, condition: "Partly Cloudy", icon: Sun },
    { day: "Wed", high: 25, low: 17, condition: "Cloudy", icon: CloudRain },
    { day: "Thu", high: 23, low: 16, condition: "Rain", icon: CloudRain },
    { day: "Fri", high: 24, low: 17, condition: "Partly Cloudy", icon: Sun },
    { day: "Sat", high: 27, low: 19, condition: "Sunny", icon: Sun },
    { day: "Sun", high: 29, low: 20, condition: "Sunny", icon: Sun },
  ];

  const aiInsights = [
    {
      type: "positive",
      message: "Good planting window for the next 3 days with optimal temperatures.",
    },
    {
      type: "warning",
      message: "Heavy rain expected Thursday - delay fertilizer application.",
    },
    {
      type: "info",
      message: "Weekend heat - consider increasing irrigation frequency for shallow-rooted crops.",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30 pb-20 md:pb-6">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Weather Dashboard</h1>
            <p className="text-sm text-muted-foreground">Nelspruit, Mpumalanga</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Current Weather */}
        <Card className="shadow-medium bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle>Current Conditions</CardTitle>
            <CardDescription>Updated just now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 mb-6">
              <Sun className="h-16 w-16 text-accent" />
              <div>
                <div className="text-5xl font-bold">{currentWeather.temp}°C</div>
                <div className="text-lg text-muted-foreground">{currentWeather.condition}</div>
                <div className="text-sm text-muted-foreground">Feels like {currentWeather.feelsLike}°C</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-semibold">{currentWeather.humidity}%</div>
                  <div className="text-xs text-muted-foreground">Humidity</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-semibold">{currentWeather.wind} km/h</div>
                  <div className="text-xs text-muted-foreground">Wind</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-semibold">{currentWeather.rainfall} mm</div>
                  <div className="text-xs text-muted-foreground">Rainfall</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              AI Farming Insights
            </CardTitle>
            <CardDescription>Weather-based recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiInsights.map((insight, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${
                  insight.type === "positive"
                    ? "bg-primary/5 border-primary/20"
                    : insight.type === "warning"
                    ? "bg-destructive/5 border-destructive/20"
                    : "bg-accent/5 border-accent/20"
                }`}
              >
                <p className="text-sm">{insight.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 7-Day Forecast */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>7-Day Forecast</CardTitle>
            <CardDescription>Plan your farm activities ahead</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {forecast.map((day, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 font-semibold">{day.day}</div>
                    <day.icon className="h-5 w-5 text-accent" />
                    <div className="text-sm text-muted-foreground flex-1">{day.condition}</div>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <span className="font-semibold">{day.high}°</span>
                    <span className="text-muted-foreground">{day.low}°</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Weather;
