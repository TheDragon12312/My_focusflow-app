
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/lib/i18n";
import { toast } from "sonner";
import { realGoogleIntegration, GoogleCalendarEvent } from "@/lib/real-google-integration";

const RealTimeGoogleCalendar = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState<GoogleCalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  useEffect(() => {
    if (isConnected) {
      loadEvents();
    }
  }, [isConnected, selectedDate]);

  const checkConnectionStatus = () => {
    setIsConnected(realGoogleIntegration.isConnected());
  };

  const handleConnect = async () => {
    setLoading(true);
    try {
      // In een echte implementatie zou dit de Google OAuth flow starten
      const success = await realGoogleIntegration.connect();
      if (success) {
        setIsConnected(true);
        toast.success(t("calendar.connected"));
        await loadEvents();
      } else {
        toast.error("Verbinding met Google Agenda mislukt");
      }
    } catch (error) {
      console.error("Google Calendar connection error:", error);
      toast.error("Er ging iets mis bij het verbinden");
    } finally {
      setLoading(false);
    }
  };

  const loadEvents = async () => {
    if (!isConnected) return;
    
    setLoading(true);
    try {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const calendarEvents = await realGoogleIntegration.getEvents(
        "primary",
        startOfDay,
        endOfDay
      );
      setEvents(calendarEvents);
    } catch (error) {
      console.error("Failed to load events:", error);
      toast.error("Kon afspraken niet laden");
    } finally {
      setLoading(false);
    }
  };

  const createFocusSessionFromEvent = async (event: GoogleCalendarEvent) => {
    try {
      const duration = Math.floor(
        (new Date(event.end.dateTime).getTime() - new Date(event.start.dateTime).getTime()) / 
        (1000 * 60)
      );
      
      await realGoogleIntegration.createFocusSession(
        `Voorbereiding: ${event.summary}`,
        Math.min(duration, 120) // Max 2 uur
      );
      
      toast.success("Focus sessie aangemaakt!");
    } catch (error) {
      console.error("Failed to create focus session:", error);
      toast.error("Kon focus sessie niet aanmaken");
    }
  };

  if (!isConnected) {
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <CalendarIcon className="h-5 w-5" />
            {t("calendar.integration")}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-gray-600 dark:text-gray-400">
            <CalendarIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">
              Nog niet verbonden met Google Agenda
            </p>
            <p>
              Verbind je Google Agenda om je afspraken te importeren en automatisch 
              focus sessies in te plannen.
            </p>
          </div>
          <Button 
            onClick={handleConnect}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <CalendarIcon className="h-4 w-4 mr-2" />
            )}
            {t("calendar.connectGoogle")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {t("calendar.connected")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Agenda synchronisatie actief
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={loadEvents}
              disabled={loading}
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Agenda</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border dark:border-gray-600"
            />
          </CardContent>
        </Card>

        {/* Events */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Afspraken voor {selectedDate.toLocaleDateString('nl-NL')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">Afspraken laden...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>Geen afspraken voor deze dag</p>
              </div>
            ) : (
              <div className="space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {event.summary}
                        </h4>
                        {event.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {event.description}
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
                          {event.attendees && event.attendees.length > 0 && (
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {event.attendees.length} deelnemers
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => createFocusSessionFromEvent(event)}
                        >
                          Focus Sessie
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeGoogleCalendar;
