import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Brain,
  Lightbulb,
  Target,
  TrendingUp,
  Clock,
  Zap,
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  RefreshCw,
  AlertTriangle,
  Trophy,
  Coffee,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Settings,
  Calendar,
  BarChart3,
  Send,
  Plane as Planning,
} from "lucide-react";
import { enhancedAIService, EnhancedAIInsight, AIChat } from "@/lib/enhanced-ai-service";
import { SettingsManager } from "@/lib/settings-manager";
import { PersistentStats } from "@/lib/persistent-stats";
import { notificationService } from "@/lib/notification-service";
import { useTranslation } from "@/lib/i18n";

interface CoachState {
  isMinimized: boolean;
  currentInsight: EnhancedAIInsight | null;
  currentInsightIndex: number;
  insights: EnhancedAIInsight[];
  lastUpdate: Date;
  isGenerating: boolean;
  showChat: boolean;
  chatMessage: string;
  chatHistory: AIChat[];
  isSendingMessage: boolean;
}

const AIProductivityCoach = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [coachState, setCoachState] = useState<CoachState>({
    isMinimized: false,
    currentInsight: null,
    currentInsightIndex: 0,
    insights: [],
    lastUpdate: new Date(),
    isGenerating: false,
    showChat: false,
    chatMessage: "",
    chatHistory: [],
    isSendingMessage: false,
  });

  useEffect(() => {
    if (!user?.id) return;

    // Load existing insights and chat history
    loadStoredInsights();
    enhancedAIService.loadChatHistory();
    setCoachState(prev => ({
      ...prev,
      chatHistory: enhancedAIService.getChatHistory()
    }));

    // Generate new insights if needed
    const shouldGenerate = coachState.insights.length === 0 || shouldRefreshInsights();
    if (shouldGenerate) {
      generateInsights();
    }

    // Auto-refresh insights every 15 minutes
    const interval = setInterval(() => {
      if (shouldRefreshInsights()) {
        generateInsights();
      }
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  const loadStoredInsights = () => {
    const storedInsights = enhancedAIService.getStoredInsights();
    
    setCoachState((prev) => ({
      ...prev,
      insights: storedInsights,
      currentInsight: storedInsights.length > 0 ? storedInsights[0] : null,
      currentInsightIndex: 0,
    }));
  };

  const shouldRefreshInsights = (): boolean => {
    if (coachState.insights.length === 0) return true;
    const latestInsight = coachState.insights[0];
    const hoursSinceUpdate = (Date.now() - new Date(latestInsight.timestamp).getTime()) / (1000 * 60 * 60);
    return hoursSinceUpdate > 1; // Refresh every hour
  };

  const generateInsights = async () => {
    if (!user?.id || coachState.isGenerating) return;

    const aiCoachingEnabled = SettingsManager.getSetting("aiCoaching");
    if (!aiCoachingEnabled) return;

    setCoachState(prev => ({ ...prev, isGenerating: true }));

    try {
      console.log("🤖 Generating personalized AI insights...");
      
      // Get user stats for AI analysis
      const todayStats = PersistentStats.getTodaysStats();
      const userStats = {
        focusTime: todayStats.focusTime,
        sessionsCompleted: todayStats.sessionsCompleted,
        distractionsBlocked: todayStats.distractionsBlocked,
        productivity: todayStats.productivity,
      };

      const newInsights = await enhancedAIService.generateRealInsights(userStats, user.id);
      
      // Combine with existing insights
      const allInsights = [...newInsights, ...coachState.insights].slice(0, 10);

      setCoachState((prev) => ({
        ...prev,
        insights: allInsights,
        currentInsight: allInsights.length > 0 ? allInsights[0] : null,
        currentInsightIndex: 0,
        lastUpdate: new Date(),
        isGenerating: false,
      }));

      console.log("✅ Personalized AI insights generated successfully");
    } catch (error) {
      console.error("Failed to generate insights:", error);
      setCoachState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const sendChatMessage = async () => {
    if (!coachState.chatMessage.trim() || coachState.isSendingMessage || !user?.id) return;

    setCoachState(prev => ({ ...prev, isSendingMessage: true }));

    try {
      const response = await enhancedAIService.sendChatMessage(coachState.chatMessage, user.id);
      
      setCoachState(prev => ({
        ...prev,
        chatMessage: "",
        chatHistory: enhancedAIService.getChatHistory(),
        isSendingMessage: false
      }));
    } catch (error) {
      console.error("Failed to send chat message:", error);
      setCoachState(prev => ({ ...prev, isSendingMessage: false }));
    }
  };

  const toggleChat = () => {
    setCoachState(prev => ({
      ...prev,
      showChat: !prev.showChat
    }));
  };

  const dismissInsight = () => {
    if (!user?.id || !coachState.currentInsight) return;

    enhancedAIService.markInsightAsRead(coachState.currentInsight.id);

    const remainingInsights = coachState.insights.filter(
      (insight) => insight.id !== coachState.currentInsight?.id,
    );

    setCoachState((prev) => ({
      ...prev,
      insights: remainingInsights,
      currentInsight: remainingInsights[0] || null,
      currentInsightIndex: 0,
    }));
  };

  const navigateInsight = (direction: "prev" | "next") => {
    if (coachState.insights.length === 0) return;

    let newIndex = coachState.currentInsightIndex;

    if (direction === "next") {
      newIndex = (newIndex + 1) % coachState.insights.length;
    } else {
      newIndex = newIndex === 0 ? coachState.insights.length - 1 : newIndex - 1;
    }

    setCoachState((prev) => ({
      ...prev,
      currentInsightIndex: newIndex,
      currentInsight: prev.insights[newIndex] || null,
    }));
  };

  const toggleMinimize = () => {
    setCoachState((prev) => ({
      ...prev,
      isMinimized: !prev.isMinimized,
    }));
  };

  const handleAction = async () => {
    if (!coachState.currentInsight?.action) return;

    const action = coachState.currentInsight.action.toLowerCase();
    console.log("🤖 AI Action triggered:", action);

    try {
      if (action.includes("ga verder") || action.includes("start sessie") || action.includes("start")) {
        navigate("/focus");
      } else if (action.includes("pauze")) {
        navigate("/pause");
      } else if (action.includes("statistieken")) {
        navigate("/statistics");
      } else if (action.includes("instellingen")) {
        navigate("/settings");
      } else {
        notificationService.showNotification({
          title: "🤖 AI Actie Uitgevoerd",
          message: `"${coachState.currentInsight.action}" is succesvol uitgevoerd!`,
          type: "success",
        });
      }

      dismissInsight();
    } catch (error) {
      console.error("❌ Error executing AI action:", error);
      
      notificationService.showNotification({
        title: "⚠️ Actie Mislukt",
        message: "Er ging iets mis bij het uitvoeren van de AI actie.",
        type: "error",
      });
    }
  };

  const getInsightIcon = (type: EnhancedAIInsight["type"]) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "achievement":
        return <Trophy className="h-4 w-4" />;
      case "tip":
        return <Lightbulb className="h-4 w-4" />;
      case "suggestion":
        return <Target className="h-4 w-4" />;
      case "motivation":
        return <Zap className="h-4 w-4" />;
      case "health":
        return <Coffee className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  const getInsightColor = (type: EnhancedAIInsight["type"]) => {
    switch (type) {
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "achievement":
        return "text-green-600 bg-green-50 border-green-200";
      case "tip":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "suggestion":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "motivation":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "health":
        return "text-teal-600 bg-teal-50 border-teal-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getPriorityColor = (priority: EnhancedAIInsight["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  // Don't render if AI is disabled
  const aiCoachingEnabled = SettingsManager.getSetting("aiCoaching");
  if (!aiCoachingEnabled || !user) return null;

  return (
    <Card
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        coachState.isMinimized ? "w-16 h-16" : coachState.showChat ? "w-96 max-h-[600px]" : "w-80 max-h-96"
      } shadow-xl border-l-4 border-l-blue-500 bg-white`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/ai-coach-avatar.png" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                <Brain className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            {!coachState.isMinimized && (
              <div>
                <CardTitle className="text-sm font-medium">{t("aiCoach.title")}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {coachState.isGenerating 
                    ? "Analyseert..." 
                    : `${coachState.insights.length} insights beschikbaar`
                  }
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-1">
            {!coachState.isMinimized && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="h-6 w-6 p-0"
                  title="Chat met AI Coach"
                >
                  <MessageCircle className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={generateInsights}
                  disabled={coachState.isGenerating}
                  className="h-6 w-6 p-0"
                  title="Vernieuw insights"
                >
                  <RefreshCw
                    className={`h-3 w-3 ${coachState.isGenerating ? "animate-spin" : ""}`}
                  />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMinimize}
              className="h-6 w-6 p-0"
              title={coachState.isMinimized ? "Uitklappen" : "Inklappen"}
            >
              {coachState.isMinimized ? (
                <Maximize2 className="h-3 w-3" />
              ) : (
                <Minimize2 className="h-3 w-3" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {!coachState.isMinimized && (
        <CardContent className="pt-0">
          {coachState.showChat ? (
            // Chat Interface
            <div className="space-y-3">
              <ScrollArea className="h-60">
                <div className="space-y-2 pr-4">
                  {coachState.chatHistory.length === 0 ? (
                    <div className="text-center py-4">
                      <Brain className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Hallo! Ik ben je persoonlijke productiviteitscoach.
                      </p>
                      <p className="text-xs text-gray-500">
                        Stel me een vraag over focus, motivatie of productiviteit!
                      </p>
                    </div>
                  ) : (
                    coachState.chatHistory.map((chat) => (
                      <div
                        key={chat.id}
                        className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg p-2 text-sm ${
                            chat.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p>{chat.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {chat.timestamp.toLocaleTimeString("nl-NL", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                  {coachState.isSendingMessage && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-2 max-w-[85%]">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-blue-500 animate-pulse" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <div className="flex gap-2">
                <Input
                  value={coachState.chatMessage}
                  onChange={(e) => setCoachState(prev => ({ ...prev, chatMessage: e.target.value }))}
                  placeholder="Vraag me iets over productiviteit..."
                  onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                  className="flex-1 text-sm"
                  disabled={coachState.isSendingMessage}
                />
                <Button
                  onClick={sendChatMessage}
                  disabled={!coachState.chatMessage.trim() || coachState.isSendingMessage}
                  size="sm"
                  className="px-2"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleChat}
                className="w-full text-xs"
              >
                Terug naar Insights
              </Button>
            </div>
          ) : (
            // Insights Interface (existing code)
            <>
              {coachState.isGenerating ? (
                <div className="text-center py-4">
                  <Brain className="h-8 w-8 mx-auto text-blue-500 mb-2 animate-pulse" />
                  <p className="text-sm text-blue-600 font-medium">
                    AI analyseert je productiviteit...
                  </p>
                  <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                    <div className="bg-blue-500 h-2 rounded-full animate-pulse w-3/4"></div>
                  </div>
                </div>
              ) : coachState.currentInsight ? (
                <div className="space-y-3">
                  {/* Current Insight */}
                  <div
                    className={`p-3 rounded-lg border ${getInsightColor(coachState.currentInsight.type)}`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-0.5">
                        {getInsightIcon(coachState.currentInsight.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-medium">
                              {coachState.currentInsight.title}
                            </h4>
                            {coachState.insights.length > 1 && (
                              <Badge variant="outline" className="text-xs px-1 h-5">
                                {coachState.currentInsightIndex + 1}/
                                {coachState.insights.length}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <div
                              className={`w-2 h-2 rounded-full ${getPriorityColor(coachState.currentInsight.priority)}`}
                            />
                            {coachState.insights.length > 1 && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => navigateInsight("prev")}
                                  className="h-4 w-4 p-0 opacity-60 hover:opacity-100"
                                >
                                  <ChevronLeft className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => navigateInsight("next")}
                                  className="h-4 w-4 p-0 opacity-60 hover:opacity-100"
                                >
                                  <ChevronRight className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={dismissInsight}
                              className="h-4 w-4 p-0 opacity-60 hover:opacity-100"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                          {coachState.currentInsight.message}
                        </p>
                        {coachState.currentInsight.actionable &&
                          coachState.currentInsight.action && (
                            <Button
                              size="sm"
                              onClick={handleAction}
                              className="text-xs h-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                            >
                              <Play className="h-3 w-3 mr-1" />
                              {coachState.currentInsight.action}
                            </Button>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* Last Update */}
                  <div className="text-xs text-gray-400 text-center">
                    Laatste update:{" "}
                    {coachState.lastUpdate.toLocaleTimeString("nl-NL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Brain className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">
                    Geen insights beschikbaar
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateInsights}
                    disabled={coachState.isGenerating}
                    className="text-xs"
                  >
                    <RefreshCw
                      className={`h-3 w-3 mr-1 ${coachState.isGenerating ? "animate-spin" : ""}`}
                    />
                    Genereer Insights
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default AIProductivityCoach;
