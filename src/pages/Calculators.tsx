import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calculator as CalcIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Calculators = () => {
  const navigate = useNavigate();
  const [fertilizerResult, setFertilizerResult] = useState<any>(null);

  const calculateFertilizer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const size = parseFloat(formData.get("size") as string);
    
    // Simple calculation logic
    const npk = {
      n: Math.round(size * 50),
      p: Math.round(size * 30),
      k: Math.round(size * 40),
    };
    const cost = Math.round(size * 850);
    const savings = Math.round(cost * 0.15);

    setFertilizerResult({
      npk,
      cost,
      savings,
      timing: "Apply at planting and repeat after 4-6 weeks",
    });
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
            <h1 className="text-xl font-bold">Input Calculators</h1>
            <p className="text-sm text-muted-foreground">Optimize your farm inputs</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="fertilizer" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
            <TabsTrigger value="pesticide">Pesticide</TabsTrigger>
            <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
          </TabsList>

          {/* Fertilizer Calculator */}
          <TabsContent value="fertilizer">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalcIcon className="h-5 w-5 text-primary" />
                  Fertilizer Calculator
                </CardTitle>
                <CardDescription>Calculate optimal fertilizer amounts for your crops</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={calculateFertilizer} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="crop">Crop Type</Label>
                    <Select name="crop" defaultValue="maize">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maize">Maize</SelectItem>
                        <SelectItem value="citrus">Citrus</SelectItem>
                        <SelectItem value="tomatoes">Tomatoes</SelectItem>
                        <SelectItem value="sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Field Size (hectares)</Label>
                    <Input
                      id="size"
                      name="size"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 5"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stage">Growth Stage</Label>
                    <Select name="stage" defaultValue="vegetative">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seedling">Seedling</SelectItem>
                        <SelectItem value="vegetative">Vegetative</SelectItem>
                        <SelectItem value="flowering">Flowering</SelectItem>
                        <SelectItem value="fruiting">Fruiting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fertility">Soil Fertility</Label>
                    <Select name="fertility" defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" size="lg">Calculate</Button>
                </form>

                {fertilizerResult && (
                  <div className="mt-6 space-y-4">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <h3 className="font-semibold mb-3">Recommended NPK Amounts</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-primary">{fertilizerResult.npk.n}</div>
                          <div className="text-sm text-muted-foreground">Nitrogen (kg)</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">{fertilizerResult.npk.p}</div>
                          <div className="text-sm text-muted-foreground">Phosphorus (kg)</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary">{fertilizerResult.npk.k}</div>
                          <div className="text-sm text-muted-foreground">Potassium (kg)</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Estimated Cost</span>
                        <span className="font-semibold">R {fertilizerResult.cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Potential Savings</span>
                        <span className="font-semibold text-primary">R {fertilizerResult.savings}</span>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm"><strong>Application Timing:</strong> {fertilizerResult.timing}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pesticide Calculator */}
          <TabsContent value="pesticide">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Pesticide Calculator</CardTitle>
                <CardDescription>Coming soon - Calculate pesticide requirements</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8 text-muted-foreground">
                <p>This calculator will help you determine the right amount of pesticide needed.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Irrigation Calculator */}
          <TabsContent value="irrigation">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Irrigation Calculator</CardTitle>
                <CardDescription>Coming soon - Calculate water requirements</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8 text-muted-foreground">
                <p>This calculator will help you optimize your irrigation schedule.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Calculators;
