import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("smartfarm_user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-20 md:pb-6">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Profile & Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your account</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Farm Profile Setup
            </CardTitle>
            <CardDescription>Manage your farm fields and crops</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/farm-profile")}
            >
              Manage Farm Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>About Smart Farm</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Version 1.0.0</p>
            <p>Powered by Lovable AI</p>
            <p>Weather data from OpenWeatherMap</p>
            <p className="pt-2 text-xs">© 2025 Smart Farm. Built for Mpumalanga farmers.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
