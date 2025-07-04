import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";
import {
  Shield,
  TrendingUp,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Target,
  Calendar,
  DollarSign,
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    score: number;
  }[];
}

interface RiskResult {
  level: string;
  score: number;
  description: string;
  color: string;
  recommendations: string[];
}

export default function RiskProfile() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null);

  const questions: Question[] = [
    {
      id: "age",
      question: "What is your age?",
      options: [
        { value: "18-25", label: "18-25 years", score: 5 },
        { value: "26-35", label: "26-35 years", score: 4 },
        { value: "36-45", label: "36-45 years", score: 3 },
        { value: "46-55", label: "46-55 years", score: 2 },
        { value: "55+", label: "55+ years", score: 1 },
      ],
    },
    {
      id: "investment_horizon",
      question: "What is your investment time horizon?",
      options: [
        { value: "less-than-1", label: "Less than 1 year", score: 1 },
        { value: "1-3", label: "1-3 years", score: 2 },
        { value: "3-5", label: "3-5 years", score: 3 },
        { value: "5-10", label: "5-10 years", score: 4 },
        { value: "more-than-10", label: "More than 10 years", score: 5 },
      ],
    },
    {
      id: "risk_tolerance",
      question:
        "How would you react if your investment portfolio lost 20% of its value in a month?",
      options: [
        {
          value: "sell-all",
          label: "Sell all investments immediately",
          score: 1,
        },
        { value: "sell-some", label: "Sell some investments", score: 2 },
        { value: "hold", label: "Hold and wait for recovery", score: 3 },
        { value: "buy-more", label: "Buy more while prices are low", score: 4 },
        {
          value: "significantly-more",
          label: "Invest significantly more",
          score: 5,
        },
      ],
    },
    {
      id: "income_stability",
      question: "How stable is your current income?",
      options: [
        { value: "very-unstable", label: "Very unstable", score: 1 },
        { value: "somewhat-unstable", label: "Somewhat unstable", score: 2 },
        { value: "stable", label: "Stable", score: 3 },
        { value: "very-stable", label: "Very stable", score: 4 },
        { value: "guaranteed", label: "Guaranteed (pension, etc.)", score: 5 },
      ],
    },
    {
      id: "emergency_fund",
      question:
        "Do you have an emergency fund covering 3-6 months of expenses?",
      options: [
        { value: "no-fund", label: "No emergency fund", score: 1 },
        { value: "partial", label: "Partial emergency fund", score: 2 },
        { value: "adequate", label: "Adequate emergency fund", score: 3 },
        { value: "substantial", label: "Substantial emergency fund", score: 4 },
        { value: "extensive", label: "Extensive emergency fund", score: 5 },
      ],
    },
    {
      id: "investment_experience",
      question: "What is your investment experience?",
      options: [
        { value: "none", label: "No investment experience", score: 1 },
        { value: "limited", label: "Limited experience", score: 2 },
        { value: "moderate", label: "Moderate experience", score: 3 },
        { value: "extensive", label: "Extensive experience", score: 4 },
        { value: "professional", label: "Professional investor", score: 5 },
      ],
    },
    {
      id: "investment_goals",
      question: "What is your primary investment goal?",
      options: [
        { value: "preservation", label: "Capital preservation", score: 1 },
        { value: "income", label: "Generate income", score: 2 },
        { value: "balanced", label: "Balanced growth and income", score: 3 },
        { value: "growth", label: "Long-term growth", score: 4 },
        { value: "aggressive", label: "Aggressive growth", score: 5 },
      ],
    },
    {
      id: "debt_level",
      question: "What is your current debt level (excluding mortgage)?",
      options: [
        { value: "high", label: "High debt level", score: 1 },
        { value: "moderate", label: "Moderate debt level", score: 2 },
        { value: "low", label: "Low debt level", score: 3 },
        { value: "minimal", label: "Minimal debt", score: 4 },
        { value: "none", label: "No debt", score: 5 },
      ],
    },
  ];

  const getRiskResult = (totalScore: number): RiskResult => {
    const maxScore = questions.length * 5;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage <= 25) {
      return {
        level: "Conservative",
        score: totalScore,
        description:
          "You prefer stability and capital preservation over high returns. You're comfortable with low-risk investments that provide steady, predictable returns.",
        color: "text-blue-600",
        recommendations: [
          "High-grade bonds and government securities",
          "Conservative mutual funds",
          "High-yield savings accounts and CDs",
          "Dividend-paying stocks from stable companies",
        ],
      };
    } else if (percentage <= 50) {
      return {
        level: "Moderate Conservative",
        score: totalScore,
        description:
          "You seek a balance between growth and stability, willing to accept some risk for potentially higher returns than purely conservative investments.",
        color: "text-green-600",
        recommendations: [
          "Balanced mutual funds (60% bonds, 40% stocks)",
          "Target-date funds",
          "Blue-chip dividend stocks",
          "Investment-grade corporate bonds",
        ],
      };
    } else if (percentage <= 75) {
      return {
        level: "Moderate Aggressive",
        score: totalScore,
        description:
          "You're willing to accept moderate to high risk for the potential of higher returns, understanding that your investments will fluctuate in value.",
        color: "text-orange-600",
        recommendations: [
          "Growth-oriented mutual funds",
          "Large-cap and mid-cap stocks",
          "International diversified funds",
          "Real estate investment trusts (REITs)",
        ],
      };
    } else {
      return {
        level: "Aggressive",
        score: totalScore,
        description:
          "You're comfortable with high risk and volatility in pursuit of maximum long-term growth potential. You understand and accept significant fluctuations in portfolio value.",
        color: "text-red-600",
        recommendations: [
          "Growth stocks and small-cap funds",
          "Emerging markets investments",
          "Technology and innovation funds",
          "Alternative investments (with proper diversification)",
        ],
      };
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final score
      const totalScore = questions.reduce((sum, question) => {
        const answer = answers[question.id];
        const option = question.options.find((opt) => opt.value === answer);
        return sum + (option?.score || 0);
      }, 0);

      const result = getRiskResult(totalScore);
      setRiskResult(result);
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setRiskResult(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[questions[currentQuestion]?.id];

  if (isCompleted && riskResult) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-financial-blue-light to-background">
          <div className="container py-8">
            <div className="max-w-4xl mx-auto">
              {/* Results Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-financial-green-light mb-4">
                  <CheckCircle className="w-8 h-8 text-financial-green" />
                </div>
                <h1 className="text-3xl font-bold mb-2">
                  Risk Assessment Complete
                </h1>
                <p className="text-muted-foreground">
                  Based on your responses, here's your personalized risk profile
                </p>
              </div>

              {/* Risk Level Card */}
              <Card className="mb-8 border-2 border-financial-blue">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-financial-blue-light mb-4 mx-auto">
                    <Shield className="w-10 h-10 text-financial-blue" />
                  </div>
                  <CardTitle className="text-2xl">
                    Your Risk Profile:{" "}
                    <span className={riskResult.color}>{riskResult.level}</span>
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Score: {riskResult.score} out of {questions.length * 5}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-lg mb-6">
                    {riskResult.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Investment Recommendations */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Recommended Investments
                      </h3>
                      <ul className="space-y-2">
                        {riskResult.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-financial-green mt-1 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Portfolio Allocation Suggestion */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Suggested Allocation
                      </h3>
                      <div className="space-y-3">
                        {riskResult.level === "Conservative" && (
                          <>
                            <div className="flex justify-between items-center">
                              <span>Bonds & Fixed Income</span>
                              <span className="font-medium">70%</span>
                            </div>
                            <Progress value={70} className="h-2" />
                            <div className="flex justify-between items-center">
                              <span>Stocks</span>
                              <span className="font-medium">25%</span>
                            </div>
                            <Progress value={25} className="h-2" />
                            <div className="flex justify-between items-center">
                              <span>Cash & Alternatives</span>
                              <span className="font-medium">5%</span>
                            </div>
                            <Progress value={5} className="h-2" />
                          </>
                        )}
                        {riskResult.level === "Moderate Conservative" && (
                          <>
                            <div className="flex justify-between items-center">
                              <span>Bonds & Fixed Income</span>
                              <span className="font-medium">60%</span>
                            </div>
                            <Progress value={60} className="h-2" />
                            <div className="flex justify-between items-center">
                              <span>Stocks</span>
                              <span className="font-medium">35%</span>
                            </div>
                            <Progress value={35} className="h-2" />
                            <div className="flex justify-between items-center">
                              <span>Alternatives</span>
                              <span className="font-medium">5%</span>
                            </div>
                            <Progress value={5} className="h-2" />
                          </>
                        )}
                        {riskResult.level === "Moderate Aggressive" && (
                          <>
                            <div className="flex justify-between items-center">
                              <span>Stocks</span>
                              <span className="font-medium">65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                            <div className="flex justify-between items-center">
                              <span>Bonds & Fixed Income</span>
                              <span className="font-medium">25%</span>
                            </div>
                            <Progress value={25} className="h-2" />
                            <div className="flex justify-between items-center">
                              <span>Alternatives</span>
                              <span className="font-medium">10%</span>
                            </div>
                            <Progress value={10} className="h-2" />
                          </>
                        )}
                        {riskResult.level === "Aggressive" && (
                          <>
                            <div className="flex justify-between items-center">
                              <span>Stocks</span>
                              <span className="font-medium">80%</span>
                            </div>
                            <Progress value={80} className="h-2" />
                            <div className="flex justify-between items-center">
                              <span>Alternatives</span>
                              <span className="font-medium">15%</span>
                            </div>
                            <Progress value={15} className="h-2" />
                            <div className="flex justify-between items-center">
                              <span>Bonds & Cash</span>
                              <span className="font-medium">5%</span>
                            </div>
                            <Progress value={5} className="h-2" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Button onClick={handleRestart} variant="outline">
                      Retake Assessment
                    </Button>
                    <Button>
                      Create Portfolio
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Important Considerations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">
                      • Risk tolerance can change over time based on life
                      circumstances
                    </p>
                    <p className="text-sm">
                      • Past performance doesn't guarantee future results
                    </p>
                    <p className="text-sm">
                      • Diversification is key to managing investment risk
                    </p>
                    <p className="text-sm">
                      • Consider consulting with a financial advisor for
                      personalized advice
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm">
                      • Review and update your risk profile annually
                    </p>
                    <p className="text-sm">
                      • Start with our recommended portfolio allocation
                    </p>
                    <p className="text-sm">
                      • Set up automatic investments for consistency
                    </p>
                    <p className="text-sm">
                      • Monitor and rebalance your portfolio regularly
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-financial-blue-light to-background">
        <div className="container py-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Risk Profile Assessment
              </h1>
              <p className="text-muted-foreground">
                Complete this assessment to determine your investment risk
                tolerance and get personalized recommendations
              </p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">
                  {questions[currentQuestion]?.question}
                </CardTitle>
                <CardDescription>
                  Please select the option that best describes your situation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={currentAnswer || ""}
                  onValueChange={handleAnswerChange}
                  className="space-y-3"
                >
                  {questions[currentQuestion]?.options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="text-sm text-muted-foreground">
                {Object.keys(answers).length} of {questions.length} answered
              </div>

              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                className={cn(
                  currentQuestion === questions.length - 1 &&
                    "bg-financial-green hover:bg-financial-green/90",
                )}
              >
                {currentQuestion === questions.length - 1
                  ? "Complete Assessment"
                  : "Next Question"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
