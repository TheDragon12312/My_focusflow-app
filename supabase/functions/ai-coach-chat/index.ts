import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// OpenRouter API configuratie
const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "mistralai/mistral-7b-instruct:free";

// CORS headers voor alle responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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

const SYSTEM_PROMPT = `Je bent een vriendelijke en praktische AI-productiviteitscoach voor FocusFlow.

Jouw rol:
- Help gebruikers met focus, motivatie, planning en productiviteit
- Geef praktische, uitvoerbare tips
- Wees empathisch en ondersteunend
- Gebruik af en toe emoji's
- Houd antwoorden beknopt maar waardevol (max 200 woorden)
- Stel vervolgvragen om gebruikers te helpen reflecteren

Antwoord altijd in het Nederlands.`;

// Fallback antwoorden
const FALLBACK_RESPONSES = [
  "Sorry, ik kan je momenteel niet helpen door een technische storing. Neem even een pauze en probeer het opnieuw! 😊",
  "Er ging iets mis met mijn verbinding. Hier is een snelle tip: probeer de 2-minuten regel - als iets minder dan 2 minuten duurt, doe het meteen! 🚀",
  "Technische problemen van mijn kant! Een productiviteitstip: schrijf je top 3 prioriteiten voor vandaag op. Focus op wat echt belangrijk is! ✨",
];

serve(async (req: Request) => {
  console.log(`${req.method} ${req.url}`);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling CORS preflight request");
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
    // Parse request body
    let requestBody: ChatRequest;

    try {
      requestBody = await req.json();
    } catch (error) {
      console.error("JSON parse error:", error);
      return new Response(
        JSON.stringify({
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

    // Validate input
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return new Response(
        JSON.stringify({
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
          response:
            "Er ging iets mis met de chatgeschiedenis. Ververs de pagina en probeer opnieuw.",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log(
      `Processing message from user ${userId}: ${message.substring(0, 50)}...`,
    );

    // Check OpenRouter API key
    if (!OPENROUTER_API_KEY) {
      console.error("OpenRouter API key not configured");
      const fallbackResponse =
        FALLBACK_RESPONSES[
          Math.floor(Math.random() * FALLBACK_RESPONSES.length)
        ];
      return new Response(JSON.stringify({ response: fallbackResponse }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build messages array for OpenRouter
    const messages: OpenRouterMessage[] = [
      { role: "system", content: SYSTEM_PROMPT.trim() },
    ];

    // Add recent chat history (last 8 messages for context)
    const recentHistory = chatHistory.slice(-8);
    for (const historyItem of recentHistory) {
      if (historyItem.role === "user" || historyItem.role === "assistant") {
        messages.push({
          role: historyItem.role,
          content: historyItem.message.trim(),
        });
      }
    }

    // Add current user message
    messages.push({
      role: "user",
      content: message.trim(),
    });

    console.log(`Sending ${messages.length} messages to OpenRouter`);

    // Send request to OpenRouter
    const openRouterResponse = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://focusflow.app",
        "X-Title": "FocusFlow AI Coach",
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: messages,
        max_tokens: 400,
        temperature: 0.7,
        stream: false,
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
      return new Response(JSON.stringify({ response: fallbackResponse }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse OpenRouter response
    const aiData = await openRouterResponse.json();
    const aiResponse = aiData?.choices?.[0]?.message?.content?.trim();

    if (!aiResponse || aiResponse.length === 0) {
      console.error("Empty AI response from OpenRouter");
      const fallbackResponse =
        FALLBACK_RESPONSES[
          Math.floor(Math.random() * FALLBACK_RESPONSES.length)
        ];
      return new Response(JSON.stringify({ response: fallbackResponse }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log(`Generated AI response: ${aiResponse.substring(0, 100)}...`);

    // Return successful response
    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Unexpected error in AI chat function:", error);

    const fallbackResponse =
      FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];

    return new Response(JSON.stringify({ response: fallbackResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
