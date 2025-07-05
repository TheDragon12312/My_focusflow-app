import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Haal de OpenRouter API key uit de omgeving (zet deze in je Supabase project env)
const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "deepseek/deepseek-r1-0528-qwen3-8b:free"; // Pas aan indien gewenst

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatHistoryItem {
  role: "user" | "assistant";
  message: string;
  timestamp: string;
}

interface ChatRequest {
  message: string;
  chatHistory: ChatHistoryItem[];
  userId: string;
}

interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `
Je bent een warme, empathische en praktische AI-productiviteitscoach die jongeren helpt met focus, motivatie en planning.
- Wees menselijk, positief en ondersteunend
- Gebruik af en toe een emoji
- Geef praktische tips, stel vragen, erken gevoelens
- Antwoord beknopt, duidelijk en motiverend
`;

serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse en valideer de body
    const { message, chatHistory, userId }: ChatRequest = await req.json();

    if (!message || !Array.isArray(chatHistory)) {
      return new Response(JSON.stringify({ response: "Invalid request body." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Bouw messages array voor OpenRouter
    const messages: OpenRouterMessage[] = [
      { role: "system", content: SYSTEM_PROMPT.trim() },
      ...chatHistory.map((item) => ({
        role: item.role,
        content: item.message,
      })),
      { role: "user", content: message },
    ];

    // Zet API key check
    if (!OPENROUTER_API_KEY) {
      return new Response(JSON.stringify({ response: "AI service niet geconfigureerd." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Stuur request naar OpenRouter
    const aiRes = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    if (!aiRes.ok) {
      throw new Error(`OpenRouter API error: ${aiRes.status}`);
    }

    const aiData = await aiRes.json();
    const aiText = aiData?.choices?.[0]?.message?.content?.trim();

    if (!aiText) {
      throw new Error("AI gaf geen antwoord terug.");
    }

    return new Response(JSON.stringify({ response: aiText }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    // Log voor debugging
    console.error("AI coach chat error:", error);

    // Korte, neutrale fallback
    const fallback = "Sorry, ik kan nu even geen antwoord geven. Probeer het later opnieuw.";
    return new Response(JSON.stringify({ response: fallback }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
