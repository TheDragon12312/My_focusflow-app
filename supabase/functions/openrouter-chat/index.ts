import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// OpenRouter API configuratie
const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "mistralai/mistral-7b-instruct:free"; // Reliable free model

// CORS headers voor alle responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

// Interface voor chat history items
interface ChatHistoryItem {
  role: "user" | "assistant";
  message: string;
  timestamp: string;
}

// Interface voor request body
interface ChatRequest {
  message: string;
  chatHistory: ChatHistoryItem[];
  userId: string;
}

// OpenRouter message format (OpenAI compatible)
interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// System prompt voor de AI coach
const SYSTEM_PROMPT = `Je bent een vriendelijke en praktische AI-productiviteitscoach voor FocusFlow. 

Jouw rol:
- Help gebruikers met focus, motivatie, planning en productiviteit
- Geef praktische, uitvoerbare tips
- Wees empathisch en ondersteunend
- Gebruik af en toe emoji's voor een persoonlijk gevoel
- Houd antwoorden beknopt maar waardevol (max 200 woorden)
- Stel vervolgvragen om gebruikers te helpen reflecteren

Focus gebieden:
- Tijdmanagement en planning
- Focus en concentratie technieken
- Motivatie en doelen stellen
- Werk-leven balans
- Stress management
- Productiviteitsgewoontes

Antwoord altijd in het Nederlands.`;

// Fallback antwoorden voor als OpenRouter niet beschikbaar is
const FALLBACK_RESPONSES = [
  "Sorry, ik kan je momenteel niet helpen door een technische storing. Probeer het over een paar minuten opnieuw! In de tussentijd: neem een korte pauze en kom fris terug bij je werk. 😊",
  "Er ging iets mis met mijn verbinding. Maar hier is een snelle tip: probeer de 2-minuten regel - als iets minder dan 2 minuten duurt, doe het meteen! 🚀",
  "Technische problemen van mijn kant! Een goede productiviteitstip terwijl je wacht: schrijf je top 3 prioriteiten voor vandaag op. Focus op wat echt belangrijk is! ✨",
];

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 200,
    });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Method not allowed",
        response: "Sorry, alleen POST requests zijn toegestaan.",
      }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    // Parse en valideer request body
    let requestBody: ChatRequest;

    try {
      requestBody = await req.json();
    } catch (error) {
      console.error("JSON parse error:", error);
      return new Response(
        JSON.stringify({
          error: "Invalid JSON",
          response:
            "Sorry, er ging iets mis met je bericht. Probeer het opnieuw.",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const { message, chatHistory, userId } = requestBody;

    // Valideer input
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return new Response(
        JSON.stringify({
          error: "Missing message",
          response:
            "Je bericht lijkt leeg te zijn. Typ iets en probeer opnieuw!",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (!Array.isArray(chatHistory)) {
      return new Response(
        JSON.stringify({
          error: "Invalid chat history",
          response:
            "Er ging iets mis met de chatgeschiedenis. Ververs de pagina en probeer opnieuw.",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Check OpenRouter API key
    if (!OPENROUTER_API_KEY) {
      console.error("OpenRouter API key not configured");
      const fallbackResponse =
        FALLBACK_RESPONSES[
          Math.floor(Math.random() * FALLBACK_RESPONSES.length)
        ];
      return new Response(
        JSON.stringify({
          response: fallbackResponse,
          source: "fallback",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Bouw messages array voor OpenRouter (OpenAI format)
    const messages: OpenRouterMessage[] = [
      { role: "system", content: SYSTEM_PROMPT.trim() },
    ];

    // Voeg chat history toe (laatste 8 berichten voor context)
    const recentHistory = chatHistory.slice(-8);
    for (const historyItem of recentHistory) {
      if (historyItem.role === "user" || historyItem.role === "assistant") {
        messages.push({
          role: historyItem.role,
          content: historyItem.message.trim(),
        });
      }
    }

    // Voeg huidige gebruikersbericht toe
    messages.push({
      role: "user",
      content: message.trim(),
    });

    console.log(
      `[AI Chat] User ${userId} sent message, total context: ${messages.length} messages`,
    );

    // Stuur request naar OpenRouter
    const openRouterResponse = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://focusflow.app", // Optional: voor OpenRouter analytics
        "X-Title": "FocusFlow AI Coach", // Optional: voor OpenRouter analytics
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: messages,
        max_tokens: 400,
        temperature: 0.7,
        stream: false, // We gebruiken geen streaming
        top_p: 0.9,
      }),
    });

    // Check response status
    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();
      console.error(
        `OpenRouter API error: ${openRouterResponse.status} - ${errorText}`,
      );

      const fallbackResponse =
        FALLBACK_RESPONSES[
          Math.floor(Math.random() * FALLBACK_RESPONSES.length)
        ];
      return new Response(
        JSON.stringify({
          response: fallbackResponse,
          source: "fallback",
          error: `OpenRouter API error: ${openRouterResponse.status}`,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Parse OpenRouter response
    const aiData = await openRouterResponse.json();
    console.log(
      "OpenRouter response structure:",
      JSON.stringify(aiData, null, 2),
    );

    // Extract AI response
    const aiResponse = aiData?.choices?.[0]?.message?.content?.trim();

    if (!aiResponse || aiResponse.length === 0) {
      console.error("Empty AI response from OpenRouter");
      const fallbackResponse =
        FALLBACK_RESPONSES[
          Math.floor(Math.random() * FALLBACK_RESPONSES.length)
        ];
      return new Response(
        JSON.stringify({
          response: fallbackResponse,
          source: "fallback",
          error: "Empty response from AI",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log(
      `[AI Chat] Generated response for user ${userId}: ${aiResponse.substring(0, 100)}...`,
    );

    // Stuur succesvolle response terug
    return new Response(
      JSON.stringify({
        response: aiResponse,
        source: "openrouter",
        model: OPENROUTER_MODEL,
        usage: aiData?.usage || null,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    // Log de volledige error voor debugging
    console.error("Unexpected error in OpenRouter chat function:", error);

    // Geef een vriendelijke fallback response
    const fallbackResponse =
      FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];

    return new Response(
      JSON.stringify({
        response: fallbackResponse,
        source: "fallback",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
