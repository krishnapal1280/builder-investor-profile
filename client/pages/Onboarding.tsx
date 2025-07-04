import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";
import { cn } from "@/lib/utils";
import {
  Bot,
  User,
  Send,
  Loader2,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Calendar,
  Target,
  TrendingUp,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
  options?: string[];
}

interface UserProfile {
  name?: string;
  age?: number;
  income?: string;
  investmentGoals?: string[];
  riskTolerance?: string;
  timeHorizon?: string;
  experience?: string;
}

export default function Onboarding() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI investment assistant. I'll help you create a personalized investment profile. Let's start with your name - what should I call you?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (
    text: string,
    sender: "bot" | "user",
    options?: string[],
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      options,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const simulateTyping = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    handleSubmit(option);
  };

  const getNextQuestion = (step: number, profile: UserProfile) => {
    switch (step) {
      case 2:
        return {
          text: `Nice to meet you, ${profile.name}! What's your age range? This helps me understand your investment timeline.`,
          options: ["18-25", "26-35", "36-45", "46-55", "56-65", "65+"],
        };
      case 3:
        return {
          text: "What's your approximate annual income range?",
          options: [
            "Under $50K",
            "$50K - $100K",
            "$100K - $200K",
            "$200K - $500K",
            "Over $500K",
          ],
        };
      case 4:
        return {
          text: "What are your primary investment goals? (You can select multiple)",
          options: [
            "Retirement Planning",
            "Wealth Building",
            "Emergency Fund",
            "House Down Payment",
            "Children's Education",
            "Passive Income",
          ],
        };
      case 5:
        return {
          text: "How would you describe your risk tolerance?",
          options: [
            "Conservative - Prefer stability",
            "Moderate - Balanced approach",
            "Aggressive - Willing to take risks",
            "Very Aggressive - High risk, high reward",
          ],
        };
      case 6:
        return {
          text: "What's your investment time horizon?",
          options: [
            "Less than 1 year",
            "1-3 years",
            "3-5 years",
            "5-10 years",
            "More than 10 years",
          ],
        };
      case 7:
        return {
          text: "What's your investment experience level?",
          options: [
            "Beginner - New to investing",
            "Some experience - Basic knowledge",
            "Experienced - Regular investor",
            "Expert - Professional trader",
          ],
        };
      default:
        return null;
    }
  };

  const handleSubmit = (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    addMessage(text, "user");
    setInputValue("");
    simulateTyping();

    setTimeout(() => {
      let updatedProfile = { ...userProfile };

      // Update profile based on current step
      switch (currentStep) {
        case 1:
          updatedProfile.name = text;
          break;
        case 2:
          updatedProfile.age = parseInt(text.split("-")[0]) || 25;
          break;
        case 3:
          updatedProfile.income = text;
          break;
        case 4:
          updatedProfile.investmentGoals = [
            ...(updatedProfile.investmentGoals || []),
            text,
          ];
          break;
        case 5:
          updatedProfile.riskTolerance = text;
          break;
        case 6:
          updatedProfile.timeHorizon = text;
          break;
        case 7:
          updatedProfile.experience = text;
          break;
      }

      setUserProfile(updatedProfile);

      if (currentStep < totalSteps) {
        const nextQuestion = getNextQuestion(currentStep + 1, updatedProfile);
        if (nextQuestion) {
          addMessage(nextQuestion.text, "bot", nextQuestion.options);
          setCurrentStep(currentStep + 1);
        }
      } else {
        // Completed onboarding
        addMessage(
          `Perfect! I've created your personalized investment profile, ${updatedProfile.name}. Based on your responses, I recommend a ${updatedProfile.riskTolerance?.toLowerCase().includes("conservative") ? "conservative" : updatedProfile.riskTolerance?.toLowerCase().includes("aggressive") ? "aggressive" : "balanced"} investment strategy. Would you like to see your recommended portfolio?`,
          "bot",
          ["Yes, show me my portfolio", "I'd like to review my profile first"],
        );
        setIsCompleted(true);
      }
    }, 1500);
  };

  const profileSummary = [
    {
      icon: User,
      label: "Name",
      value: userProfile.name || "Not set",
    },
    {
      icon: Calendar,
      label: "Age Range",
      value: userProfile.age ? `${userProfile.age}+` : "Not set",
    },
    {
      icon: DollarSign,
      label: "Income",
      value: userProfile.income || "Not set",
    },
    {
      icon: Target,
      label: "Goals",
      value: userProfile.investmentGoals?.join(", ") || "Not set",
    },
    {
      icon: TrendingUp,
      label: "Risk Tolerance",
      value: userProfile.riskTolerance || "Not set",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-financial-blue-light to-background">
        <div className="container py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6 lg:mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                AI Investment Onboarding
              </h1>
              <p className="text-muted-foreground text-sm lg:text-base px-4">
                Let our AI assistant help you create your personalized
                investment profile
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Chat Interface */}
              <div className="lg:col-span-2 min-w-0">
                <Card className="h-[500px] lg:h-[600px] flex flex-col">
                  <CardHeader className="flex-shrink-0 pb-4">
                    <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                      <Bot className="h-5 w-5 text-financial-blue shrink-0" />
                      <span className="truncate">AI Investment Assistant</span>
                      <Badge variant="secondary" className="ml-auto shrink-0">
                        Online
                      </Badge>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col min-h-0 p-4 lg:p-6">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto space-y-3 lg:space-y-4 mb-4 min-h-0">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex",
                            message.sender === "user"
                              ? "justify-end"
                              : "justify-start",
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 lg:px-4 lg:py-3",
                              message.sender === "user"
                                ? "bg-financial-blue text-white"
                                : "bg-muted",
                            )}
                          >
                            <p className="text-sm break-words">
                              {message.text}
                            </p>

                            {/* Options */}
                            {message.options && (
                              <div className="mt-3 space-y-2">
                                {message.options.map((option, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start text-left h-auto p-2 text-xs sm:text-sm break-words whitespace-normal"
                                    onClick={() => handleOptionClick(option)}
                                    disabled={isLoading}
                                  >
                                    {option}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-muted rounded-lg px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="text-sm">AI is thinking...</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className="flex gap-2 shrink-0"
                    >
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your response..."
                        disabled={isLoading}
                        className="flex-1 min-w-0"
                      />
                      <Button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="shrink-0"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Summary */}
              <div className="space-y-4 lg:space-y-6 min-w-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                      <User className="h-5 w-5 shrink-0" />
                      <span className="truncate">Your Profile</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 lg:space-y-4">
                    {profileSummary.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 min-w-0"
                        >
                          <div className="h-8 w-8 rounded-lg bg-financial-blue-light flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4 text-financial-blue" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {item.label}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {item.value}
                            </p>
                          </div>
                          {item.value !== "Not set" && (
                            <CheckCircle className="h-4 w-4 text-financial-green shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {isCompleted && (
                  <Card className="border-financial-green">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <div className="h-12 w-12 rounded-full bg-financial-green-light flex items-center justify-center mx-auto">
                          <CheckCircle className="h-6 w-6 text-financial-green" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Profile Complete!</h3>
                          <p className="text-sm text-muted-foreground">
                            Your investment profile has been created
                            successfully.
                          </p>
                        </div>
                        <Button className="w-full">
                          View Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
