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
  Clock,
  MapPin,
  Plus,
  RefreshCw,
  Download,
  Filter,
  Edit,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PlanningItem {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  event_type: string;
  google_event_id?: string;
  location?: string;
  status: string;
  created_at: string;
}

const Planning = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [planningItems, setPlanningItems] = useState<PlanningItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      loadPlanningItems();
    }
  }, [user, navigate]);

  const loadPlanningItems = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("planning")
        .select("*")
        .eq("user_id", user.id)
        .order("start_time", { ascending: true });

      if (error) {
        console.error("Error loading planning items:", error);
        toast.error("Kon planning items niet laden");
        return;
      }

      setPlanningItems(data || []);
    } catch (error) {
      console.error("Error loading planning items:", error);
      toast.error("Er ging iets mis bij het laden");
    } finally {
      setLoading(false);
    }
  };

  const deletePlanningItem = async (id: string) => {
    try {
      const { error } = await supabase.from("planning").delete().eq("id", id);

      if (error) {
        console.error("Error deleting planning item:", error);
        toast.error("Kon item niet verwijderen");
        return;
      }

      setPlanningItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Planning item verwijderd");
    } catch (error) {
      console.error("Error deleting planning item:", error);
      toast.error("Er ging iets mis bij het verwijderen");
    }
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case "calendar_import":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "focus_session":
        return "bg-green-100 text-green-700 border-green-200";
      case "manual":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getEventTypeLabel = (eventType: string) => {
    switch (eventType) {
      case "calendar_import":
        return "Google Calendar";
      case "focus_session":
        return "Focus Sessie";
      case "manual":
        return "Handmatig";
      default:
        return eventType;
    }
  };

  const filteredItems = planningItems.filter((item) => {
    if (filter === "all") return true;
    return item.event_type === filter;
  });

  const groupedItems = filteredItems.reduce(
    (groups, item) => {
      const date = new Date(item.start_time).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    },
    {} as Record<string, PlanningItem[]>,
  );

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
                Planning Overzicht
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Bekijk en beheer je geïmporteerde calendar events en planning
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadPlanningItems}
              disabled={loading}
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
            <Button onClick={() => navigate("/calendar")} size="sm">
              <Download className="h-4 w-4 mr-2" />
              Importeer Calendar
            </Button>
            <Button
              onClick={() => navigate("/planning-editor")}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nieuwe Planning
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  Alle ({planningItems.length})
                </Button>
                <Button
                  variant={filter === "calendar_import" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("calendar_import")}
                >
                  Google Calendar (
                  {
                    planningItems.filter(
                      (i) => i.event_type === "calendar_import",
                    ).length
                  }
                  )
                </Button>
                <Button
                  variant={filter === "focus_session" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("focus_session")}
                >
                  Focus Sessies (
                  {
                    planningItems.filter(
                      (i) => i.event_type === "focus_session",
                    ).length
                  }
                  )
                </Button>
                <Button
                  variant={filter === "manual" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("manual")}
                >
                  Handmatig (
                  {
                    planningItems.filter((i) => i.event_type === "manual")
                      .length
                  }
                  )
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Planning Items */}
        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Planning items laden...</p>
            </CardContent>
          </Card>
        ) : filteredItems.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Geen planning items gevonden
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === "all"
                  ? "Je hebt nog geen planning items. Importeer je Google Calendar of maak een nieuwe planning aan."
                  : `Geen items gevonden voor filter "${getEventTypeLabel(filter)}".`}
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => navigate("/calendar")} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Importeer Calendar
                </Button>
                <Button onClick={() => navigate("/planning-editor")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Nieuwe Planning
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedItems).map(([date, items]) => (
              <Card key={date}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {new Date(date).toLocaleDateString("nl-NL", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                {item.title}
                              </h4>
                              <Badge
                                className={getEventTypeColor(item.event_type)}
                              >
                                {getEventTypeLabel(item.event_type)}
                              </Badge>
                            </div>

                            {item.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {item.description}
                              </p>
                            )}

                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(item.start_time).toLocaleTimeString(
                                  "nl-NL",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}{" "}
                                -{" "}
                                {new Date(item.end_time).toLocaleTimeString(
                                  "nl-NL",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  },
                                )}
                              </span>

                              {item.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {item.location}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // TODO: Implement edit functionality
                                toast.info(
                                  "Edit functionaliteit komt binnenkort",
                                );
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deletePlanningItem(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Planning;
