import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { realGoogleIntegration } from "@/lib/real-google-integration";
import { aiService } from "@/lib/ai-service";
import { PersistentStats } from "@/lib/persistent-stats";
import { toast } from "sonner";
import {
  ArrowLeft,
  Plus,
  Calendar,
  Clock,
  Target,
  Brain,
  Zap,
  CheckCircle,
  Edit,
  Trash2,
  Save,
  X,
  Play,
  Coffee,
  AlertCircle,
} from "lucide-react";

interface TaskBlock {
  id: string;
  task: string;
  duration: number;
  description: string;
  completed: boolean;
}

const PlanningEditor = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blocks, setBlocks] = useState<TaskBlock[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newDuration, setNewDuration] = useState(25);
  const [newDescription, setNewDescription] = useState("");
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedDuration, setEditedDuration] = useState(25);
  const [editedDescription, setEditedDescription] = useState("");
  const [suggestedTasks, setSuggestedTasks] = useState<string[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [errorEvents, setErrorEvents] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    // Load task blocks from local storage
    const storedBlocks = localStorage.getItem(`task_blocks_${user.id}`);
    if (storedBlocks) {
      setBlocks(JSON.parse(storedBlocks));
    }

    // Load AI task suggestions - convert user.id to number
    const userId = parseInt(user.id) || 0;
    const suggestions = aiService.getTaskSuggestions(userId);
    setSuggestedTasks(suggestions);
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    // Save task blocks to local storage whenever blocks change
    localStorage.setItem(`task_blocks_${user.id}`, JSON.stringify(blocks));
  }, [blocks, user?.id]);

  const handleAddTask = () => {
    if (!newTask.trim()) {
      toast.error("Taak kan niet leeg zijn!");
      return;
    }

    const newBlock: TaskBlock = {
      id: Date.now().toString(),
      task: newTask,
      duration: newDuration,
      description: newDescription,
      completed: false,
    };

    setBlocks([...blocks, newBlock]);
    setNewTask("");
    setNewDuration(25);
    setNewDescription("");
    toast.success("Taak toegevoegd aan planning! ✅");
  };

  const handleStartTask = (block: TaskBlock) => {
    navigate("/focus", { state: { block } });
  };

  const handleEditBlock = (block: TaskBlock) => {
    setEditingBlockId(block.id);
    setEditedTask(block.task);
    setEditedDuration(block.duration);
    setEditedDescription(block.description);
  };

  const handleSaveEdit = () => {
    const updatedBlocks = blocks.map((block) =>
      block.id === editingBlockId
        ? {
            ...block,
            task: editedTask,
            duration: editedDuration,
            description: editedDescription,
          }
        : block,
    );
    setBlocks(updatedBlocks);
    setEditingBlockId(null);
    toast.success("Taak bewerkt! ✅");
  };

  const handleDeleteBlock = (blockId: string) => {
    setBlocks(blocks.filter((block) => block.id !== blockId));
    setEditingBlockId(null);
    toast.success("Taak verwijderd! 🗑️");
  };

  const handleCancelEdit = () => {
    setEditingBlockId(null);
  };

  const handleCompleteTask = (blockId: string) => {
    const updatedBlocks = blocks.map((block) =>
      block.id === blockId ? { ...block, completed: !block.completed } : block,
    );
    setBlocks(updatedBlocks);
  };

  const calculateTotalTime = () => {
    return blocks.reduce((total, block) => total + block.duration, 0);
  };

  const handlePlanWithAI = async () => {
    if (!user?.id) {
      toast.error("Je moet ingelogd zijn om AI planning te gebruiken.");
      return;
    }

    try {
      // Convert user.id to number
      const userId = parseInt(user.id) || 0;
      const aiSuggestions = aiService.getTaskSuggestions(userId);
      // Convert suggestions to blocks
      const generatedBlocks = aiSuggestions.map((task, index) => ({
        id: (Date.now() + index).toString(),
        task: task,
        duration: 25,
        description: "AI gegenereerde taak",
        completed: false,
      }));
      setBlocks(generatedBlocks);
      toast.success("AI heeft je planning gemaakt! 🤖");
    } catch (error) {
      console.error("AI planning error:", error);
      toast.error("Er ging iets mis bij het genereren van de planning met AI");
    }
  };

  const handleAddToCalendar = async () => {
    if (!realGoogleIntegration.isConnected()) {
      toast.error(
        "Je moet verbinding maken met Google Calendar om taken toe te voegen.",
      );
      return;
    }

    try {
      for (const block of blocks) {
        await realGoogleIntegration.createFocusSession(block.task, block.duration);
      }
      toast.success("Taken toegevoegd aan Google Calendar! 📅");
    } catch (error) {
      console.error("Failed to add tasks to calendar:", error);
      toast.error(
        "Er ging iets mis bij het toevoegen van taken aan Google Calendar",
      );
    }
  };

  // Fetch Google Calendar events
  const handleImportCalendar = async () => {
    setLoadingEvents(true);
    setErrorEvents("");
    try {
      const res = await fetch(
        "https://cwgnlsrqnyugloobrsxz.supabase.co/functions/v1/google-auth/calander"
      );
      if (!res.ok) throw new Error("Kon Google Calendar niet ophalen");
      const data = await res.json();
      setCalendarEvents(data?.items || []);
    } catch (err: any) {
      setErrorEvents(err.message || "Onbekende fout bij ophalen afspraken");
    } finally {
      setLoadingEvents(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Terug naar Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Planning Editor
              </h1>
              <p className="text-gray-600">Plan je focus sessies</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handlePlanWithAI}>
              <Brain className="h-4 w-4 mr-2" />
              Plan met AI
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Add Task Section */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              <Plus className="h-5 w-5 mr-2 text-blue-600 inline-block align-middle" />
              Voeg een taak toe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="newTask">Taak</Label>
              <Input
                type="text"
                id="newTask"
                placeholder="Bijv. E-mails beantwoorden"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="newDuration">Duur (minuten)</Label>
              <Input
                type="number"
                id="newDuration"
                placeholder="25"
                value={newDuration}
                onChange={(e) => setNewDuration(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="newDescription">Beschrijving (optioneel)</Label>
              <Textarea
                id="newDescription"
                placeholder="Details over de taak"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <Button onClick={handleAddTask} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Taak toevoegen
            </Button>
          </CardContent>
        </Card>

        {/* Task List Section */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              <Target className="h-5 w-5 mr-2 text-purple-600 inline-block align-middle" />
              Takenlijst
              <Badge variant="secondary" className="ml-2">
                {blocks.length} taken
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {blocks.length === 0 ? (
              <div className="text-center py-6">
                <AlertCircle className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">
                  Geen taken gevonden. Voeg taken toe om je planning te starten!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {blocks.map((block) => (
                  <div key={block.id} className="py-4 flex items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{block.task}</h3>
                      <p className="text-sm text-gray-500">{block.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{block.duration} minuten</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStartTask(block)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                      {editingBlockId === block.id ? (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleSaveEdit}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Opslaan
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelEdit}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Annuleren
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditBlock(block)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteBlock(block.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCompleteTask(block.id)}
                      >
                        {block.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-400"></div>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Task Modal */}
        {editingBlockId && (
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                <Edit className="h-5 w-5 mr-2 text-orange-600 inline-block align-middle" />
                Bewerk Taak
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="editTask">Taak</Label>
                <Input
                  type="text"
                  id="editTask"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="editDuration">Duur (minuten)</Label>
                <Input
                  type="number"
                  id="editDuration"
                  value={editedDuration}
                  onChange={(e) => setEditedDuration(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="editDescription">Beschrijving</Label>
                <Textarea
                  id="editDescription"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Task Suggestions */}
        {suggestedTasks.length > 0 && (
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span>AI Taak Suggesties</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestedTasks.map((task, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => {
                      setNewTask(task);
                      toast.info(`Suggestie "${task}" toegevoegd aan nieuwe taak`);
                    }}
                    className="p-4 h-auto flex flex-col items-center space-y-2 hover:bg-blue-50"
                  >
                    <span className="text-2xl">💡</span>
                    <span className="font-medium">{task}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Calendar Integration */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <span>Google Calendar Integratie</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Voeg alle taken toe aan je Google Calendar om je planning te
              synchroniseren.
            </p>
            <Button
              onClick={handleAddToCalendar}
              className="mt-4"
              disabled={!realGoogleIntegration.isConnected()}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Toevoegen aan Calendar
            </Button>
          </CardContent>
        </Card>

        {/* Total Time Display */}
        <div className="text-right">
          <p className="text-gray-700">
            Totaal geplande tijd:{" "}
            <span className="font-bold">{calculateTotalTime()} minuten</span>
          </p>
        </div>

        {/* Google Calendar Import Section */}
        <div className="mt-8">
          <Button
            onClick={handleImportCalendar}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            disabled={loadingEvents}
          >
            📅 Google Calendar importeren
          </Button>
          {loadingEvents && (
            <div className="text-center text-gray-500 mt-2">Afspraken ophalen...</div>
          )}
          {errorEvents && (
            <div className="text-center text-red-500 mt-2">{errorEvents}</div>
          )}
          {calendarEvents.length > 0 && (
            <div className="mt-4 bg-white/80 rounded-lg shadow p-4">
              <h3 className="text-lg font-bold mb-2">Geïmporteerde afspraken</h3>
              <ul className="divide-y divide-gray-200">
                {calendarEvents.map((event, idx) => (
                  <li key={event.id || idx} className="py-2">
                    <div className="font-semibold">{event.summary || "(geen titel)"}</div>
                    <div className="text-sm text-gray-600">
                      {event.start?.dateTime || event.start?.date || "(geen datum)"}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanningEditor;
