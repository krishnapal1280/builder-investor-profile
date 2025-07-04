import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  Shield,
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Edit,
  RefreshCw,
  Eye,
  AlertTriangle,
} from "lucide-react";

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");

  const portfolioValue = {
    current: 145250,
    change: 2.35,
    changeAmount: 3350,
  };

  const allocations = [
    { name: "Stocks", value: 65, amount: 94412.5, color: "bg-financial-blue" },
    {
      name: "Bonds",
      value: 25,
      amount: 36312.5,
      color: "bg-financial-green",
    },
    {
      name: "Real Estate",
      value: 10,
      amount: 14525,
      color: "bg-financial-orange",
    },
  ];

  const holdings = [
    {
      symbol: "VOO",
      name: "Vanguard S&P 500 ETF",
      value: 45250,
      change: 1.25,
      allocation: 31.2,
    },
    {
      symbol: "VTI",
      name: "Vanguard Total Stock Market ETF",
      value: 32100,
      change: -0.85,
      allocation: 22.1,
    },
    {
      symbol: "BND",
      name: "Vanguard Total Bond Market ETF",
      value: 28400,
      change: 0.45,
      allocation: 19.6,
    },
    {
      symbol: "VEA",
      name: "Vanguard Developed Markets ETF",
      value: 21750,
      change: 2.15,
      allocation: 15.0,
    },
    {
      symbol: "VNQ",
      name: "Vanguard Real Estate ETF",
      value: 17750,
      change: -1.35,
      allocation: 12.2,
    },
  ];

  const riskMetrics = [
    { label: "Risk Score", value: "Moderate", color: "text-financial-orange" },
    { label: "Volatility", value: "12.5%", color: "text-muted-foreground" },
    { label: "Beta", value: "0.85", color: "text-muted-foreground" },
    { label: "Sharpe Ratio", value: "1.45", color: "text-financial-green" },
  ];

  const recentActivity = [
    {
      type: "buy",
      symbol: "VOO",
      amount: 2500,
      date: "2024-01-15",
      status: "completed",
    },
    {
      type: "sell",
      symbol: "VTI",
      amount: 1200,
      date: "2024-01-14",
      status: "completed",
    },
    {
      type: "dividend",
      symbol: "BND",
      amount: 125,
      date: "2024-01-12",
      status: "completed",
    },
    {
      type: "rebalance",
      symbol: "Portfolio",
      amount: 0,
      date: "2024-01-10",
      status: "completed",
    },
  ];

  const timeframes = ["1D", "1W", "1M", "3M", "6M", "1Y", "ALL"];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold truncate">
                Investment Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, Sarah! Here's your portfolio overview.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 lg:gap-3 w-full lg:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
              >
                <Edit className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Update Profile</span>
              </Button>
              <Button size="sm" className="flex-1 sm:flex-none">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Invest More</span>
              </Button>
            </div>
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Portfolio Value</CardTitle>
                    <CardDescription>Total investment value</CardDescription>
                  </div>
                  <div className="flex items-center gap-1 overflow-x-auto pb-1">
                    <div className="flex gap-1 min-w-max">
                      {timeframes.map((timeframe) => (
                        <Button
                          key={timeframe}
                          variant={
                            selectedTimeframe === timeframe
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedTimeframe(timeframe)}
                          className="shrink-0"
                        >
                          {timeframe}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-bold truncate">
                      ${portfolioValue.current.toLocaleString()}
                    </span>
                    <div
                      className={cn(
                        "flex items-center gap-1 text-sm",
                        portfolioValue.change >= 0
                          ? "text-financial-green"
                          : "text-destructive",
                      )}
                    >
                      {portfolioValue.change >= 0 ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span className="whitespace-nowrap">
                        {portfolioValue.change >= 0 ? "+" : ""}
                        {portfolioValue.change}% ($
                        {portfolioValue.changeAmount.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  {/* Simple chart placeholder */}
                  <div className="h-32 bg-gradient-to-r from-financial-blue-light to-financial-green-light rounded-lg flex items-end p-4">
                    <div className="flex items-end gap-1 w-full">
                      {Array.from({ length: 30 }, (_, i) => (
                        <div
                          key={i}
                          className="bg-financial-blue/60 rounded-sm flex-1"
                          style={{
                            height: `${Math.random() * 80 + 20}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Risk Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm text-muted-foreground">
                      {metric.label}
                    </span>
                    <span className={cn("font-medium", metric.color)}>
                      {metric.value}
                    </span>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Eye className="h-4 w-4 mr-2" />
                  Retake Assessment
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="holdings">Holdings</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Asset Allocation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Asset Allocation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {allocations.map((allocation, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{allocation.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {allocation.value}%
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress
                            value={allocation.value}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium">
                            ${allocation.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-financial-blue-light rounded-lg">
                        <div className="text-2xl font-bold text-financial-blue">
                          8.5%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Annual Return
                        </div>
                      </div>
                      <div className="text-center p-4 bg-financial-green-light rounded-lg">
                        <div className="text-2xl font-bold text-financial-green">
                          $2,450
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total Gains
                        </div>
                      </div>
                      <div className="text-center p-4 bg-financial-orange-light rounded-lg">
                        <div className="text-2xl font-bold text-financial-orange">
                          $125
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Monthly Dividends
                        </div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold">18</div>
                        <div className="text-sm text-muted-foreground">
                          Holdings
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="holdings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Holdings</CardTitle>
                  <CardDescription>
                    Your current investment positions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {holdings.map((holding, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-financial-blue-light flex items-center justify-center">
                            <span className="text-sm font-bold text-financial-blue">
                              {holding.symbol}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{holding.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {holding.allocation}% of portfolio
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${holding.value.toLocaleString()}
                          </p>
                          <p
                            className={cn(
                              "text-sm",
                              holding.change >= 0
                                ? "text-financial-green"
                                : "text-destructive",
                            )}
                          >
                            {holding.change >= 0 ? "+" : ""}
                            {holding.change}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest transactions and portfolio changes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "h-10 w-10 rounded-full flex items-center justify-center",
                              activity.type === "buy"
                                ? "bg-financial-green-light"
                                : activity.type === "sell"
                                  ? "bg-destructive/10"
                                  : activity.type === "dividend"
                                    ? "bg-financial-blue-light"
                                    : "bg-financial-orange-light",
                            )}
                          >
                            {activity.type === "buy" ? (
                              <TrendingUp className="h-5 w-5 text-financial-green" />
                            ) : activity.type === "sell" ? (
                              <TrendingDown className="h-5 w-5 text-destructive" />
                            ) : activity.type === "dividend" ? (
                              <DollarSign className="h-5 w-5 text-financial-blue" />
                            ) : (
                              <RefreshCw className="h-5 w-5 text-financial-orange" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium capitalize">
                              {activity.type} {activity.symbol}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {activity.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.amount > 0 && (
                            <p className="font-medium">
                              ${activity.amount.toLocaleString()}
                            </p>
                          )}
                          <Badge
                            variant={
                              activity.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Goal Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Retirement Goal</span>
                        <span className="text-sm text-muted-foreground">
                          68% complete
                        </span>
                      </div>
                      <Progress value={68} />
                      <p className="text-sm text-muted-foreground">
                        $145K of $215K target
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-financial-blue-light rounded-lg">
                      <p className="text-sm font-medium">Rebalance Suggested</p>
                      <p className="text-sm text-muted-foreground">
                        Your equity allocation is 3% above target
                      </p>
                    </div>
                    <div className="p-3 bg-financial-orange-light rounded-lg">
                      <p className="text-sm font-medium">
                        Tax Loss Opportunity
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Consider harvesting losses in VTI position
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
