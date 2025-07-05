
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalysisRequest {
  userStats: {
    focusTime: number;
    sessionsCompleted: number;
    distractionsBlocked: number;
    productivity: number;
  };
  userId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userStats, userId }: AnalysisRequest = await req.json();

    const prompt = `Als AI productiviteitscoach, analyseer deze gebruikersstatistieken en geef praktische inzichten:

Gebruiker ID: ${userId}
Focus tijd vandaag: ${userStats.focusTime} minuten
Voltooide sessies: ${userStats.sessionsCompleted}
Geblokkeerde afleidingen: ${userStats.distractionsBlocked}
Productiviteitsscore: ${userStats.productivity}%

Geef een JSON response met:
1. Een korte motiverende titel (max 30 karakters)
2. Een praktische tip of observatie (max 120 karakters)
3. Een actionable suggestie (max 40 karakters)
4. Prioriteit: "high", "medium", of "low"
5. Type: "motivation", "tip", "warning", of "achievement"

Antwoord alleen in het Nederlands en geef praktische, persoonlijke feedback.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Je bent een AI productiviteitscoach die Nederlandse gebruikers helpt met focus en productiviteit. Geef altijd JSON responses.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    let aiInsight;

    try {
      aiInsight = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      // Fallback if JSON parsing fails
      aiInsight = {
        title: "Blijf gefocust! 🎯",
        message: "Je bent goed bezig met je productiviteit. Blijf volhouden!",
        action: "Ga verder",
        priority: "medium",
        type: "motivation"
      };
    }

    // Add metadata
    const insight = {
      id: `ai_${Date.now()}`,
      timestamp: new Date(),
      read: false,
      actionable: true,
      ...aiInsight
    };

    return new Response(JSON.stringify({ insight }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in AI coach analysis:', error);
    
    // Fallback response
    const fallbackInsight = {
      id: `fallback_${Date.now()}`,
      title: "Focus tijd! 💪",
      message: "Elke focus sessie brengt je dichter bij je doelen. Ga zo door!",
      action: "Start sessie",
      priority: "medium",
      type: "motivation",
      timestamp: new Date(),
      read: false,
      actionable: true
    };

    return new Response(JSON.stringify({ insight: fallbackInsight }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
