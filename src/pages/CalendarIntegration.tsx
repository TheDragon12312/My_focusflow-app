
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Clock,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import RealTimeGoogleCalendar from "@/components/RealTimeGoogleCalendar";

interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: { dateTime: string };
  end: { dateTime: string };
  attendees?: Array<{ email: string }>;
}

interface MicrosoftCalendarEvent {
  id: string;
  subject: string;
  body?: { content: string };
  start: { dateTime: string };
  end: { dateTime: string };
  attendees?: Array<{ emailAddress: { address: string } }>;
}

const CalendarIntegration = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [googleEvents, setGoogleEvents] = useState<GoogleCalendarEvent[]>([]);
  const [microsoftEvents, setMicrosoftEvents] = useState<MicrosoftCalendarEvent[]>([]);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [isMicrosoftConnected, setIsMicrosoftConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      checkIntegrationStatus();
    }
  }, [user, navigate]);

  const checkIntegrationStatus = async () => {
    if (!user) return;

    try {
      const { data: integrations } = await supabase
        .from("integrations")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true);

      const googleIntegration = integrations?.find(
        (int) => int.integration_type === "google_calendar"
      );
      const microsoftIntegration = integrations?.find(
        (int) => int.integration_type === "microsoft_calendar"
      );

      setIsGoogleConnected(!!googleIntegration);
      setIsMicrosoftConnected(!!microsoftIntegration);
    } catch (error) {
      console.error("Error checking integration status:", error);
    }
  };

  const handleGoogleConnect = async () => {
    setLoading(true);
    try {
      // Mock Google OAuth flow
      const mockToken = "mock_google_token_" + Date.now();

      await supabase.from("integrations").insert({
        user_id: user?.id,
        integration_type: "google_calendar",
        access_token: mockToken,
        is_active: true,
      });

      setIsGoogleConnected(true);
      toast.success("Google Calendar verbonden!");
      await loadGoogleEvents();
    } catch (error) {
      console.error("Google Calendar connection error:", error);
      toast.error("Verbinding mislukt");
    } finally {
      setLoading(false);
    }
  };

  const handleMicrosoftConnect = async () => {
    setLoading(true);
    try {
      // Mock Microsoft OAuth flow
      const mockToken = "mock_microsoft_token_" + Date.now();

      await supabase.from("integrations").insert({
        user_id: user?.id,
        integration_type: "microsoft_calendar",
        access_token: mockToken,
        is_active: true,
      });

      setIsMicrosoftConnected(true);
      toast.success("Microsoft Calendar verbonden!");
      await loadMicrosoftEvents();
    } catch (error) {
      console.error("Microsoft Calendar connection error:", error);
      toast.error("Verbinding mislukt");
    } finally {
      setLoading(false);
    }
  };

  const loadGoogleEvents = async () => {
    // Mock Google Calendar events
    const mockEvents: GoogleCalendarEvent[] = [
      {
        id: "1",
        summary: "Team Standup",
        description: "Daily team standup meeting",
        start: { dateTime: new Date(Date.now() + 3600000).toISOString() },
        end: { dateTime: new Date(Date.now() + 5400000).toISOString() },
        attendees: [{ email: "colleague@example.com" }],
      },
      {
        id: "2",
        summary: "Project Review",
        description: "Monthly project review session",
        start: { dateTime: new Date(Date.now() + 86400000).toISOString() },
        end: { dateTime: new Date(Date.now() + 90000000).toISOString() },
      },
    ];

    setGoogleEvents(mockEvents);
  };

  const loadMicrosoftEvents = async () => {
    // Mock Microsoft Calendar events
    const mockEvents: MicrosoftCalendarEvent[] = [
      {
        id: "1",
        subject: "Client Meeting",
        body: { content: "Meeting with important client" },
        start: { dateTime: new Date(Date.now() + 7200000).toISOString() },
        end: { dateTime: new Date(Date.now() + 10800000).toISOString() },
        attendees: [{ emailAddress: { address: "client@example.com" } }],
      },
    ];

    setMicrosoftEvents(mockEvents);
  };

  const createFocusSessionFromEvent = async (event: GoogleCalendarEvent | MicrosoftCalendarEvent) => {
    try {
      const title = 'summary' in event ? event.summary : event.subject;
      const duration = Math.floor(
        (new Date(event.end.dateTime).getTime() - new Date(event.start.dateTime).getTime()) / 
        (1000 * 60)
      );
      
      // Create focus session in database
      await supabase.from("focus_blocks").insert({
        user_id: user?.id,
        block_type: "focus",
        duration: Math.min(duration, 120), // Max 2 hours
        notes: `Voorbereiding voor: ${title}`,
        status: "scheduled",
      });
      
      toast.success("Focus sessie aangemaakt!");
    } catch (error) {
      console.error("Failed to create focus session:", error);
      toast.error("Kon focus sessie niet aanmaken");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Agenda Integratie
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Verbind je agenda's en plan automatisch focus sessies
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="google" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="google">Google Calendar</TabsTrigger>
            <TabsTrigger value="microsoft">Microsoft Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="google" className="space-y-6">
            <RealTimeGoogleCalendar />
          </TabsContent>

          <TabsContent value="microsoft" className="space-y-6">
            {/* Microsoft Calendar Integration */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Calendar className="h-5 w-5" />
                  Microsoft Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isMicrosoftConnected ? (
                  <div className="text-center space-y-4">
                    <div className="text-gray-600 dark:text-gray-400">
                      <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">
                        Nog niet verbonden met Microsoft Calendar
                      </p>
                    </div>
                    <Button 
                      onClick={handleMicrosoftConnect}
                      disabled={loading}
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      {loading ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Calendar className="h-4 w-4 mr-2" />
                      )}
                      Verbind Microsoft Calendar
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-gray-900 dark:text-white">
                          Verbonden met Microsoft Calendar
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={loadMicrosoftEvents}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>

                    {microsoftEvents.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Komende afspraken
                        </h4>
                        {microsoftEvents.map((event) => (
                          <div
                            key={event.id}
                            className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {event.subject}
                                </h4>
                                {event.body?.content && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    {event.body.content}
                                  </p>
                                )}
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {new Date(event.start.dateTime).toLocaleTimeString('nl-NL', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })} - {new Date(event.end.dateTime).toLocaleTimeString('nl-NL', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => createFocusSessionFromEvent(event)}
                              >
                                Focus Sessie
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CalendarIntegration;
