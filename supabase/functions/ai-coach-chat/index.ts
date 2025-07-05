import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// OpenRouter API configuratie
const OPENROUTER_API_KEY =
  Deno.env.get("OPENROUTER_API_KEY") ||
  "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";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODEL = "deepseek/deepseek-r1-0528-qwen3-8b:free";

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

Focus gebieden:
- Tijdmanagement en planning
- Focus en concentratie technieken
- Motivatie en doelen stellen
- Werk-leven balans
- Stress management
- Productiviteitsgewoontes

Antwoord altijd in het Nederlands.`;

serve(async (req: Request) => {
  const requestId = crypto.randomUUID().substring(0, 8);
  console.log(`[${requestId}] ${req.method} ${req.url}`);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log(`[${requestId}] Handling CORS preflight request`);
    return new Response(null, {
      headers: corsHeaders,
      status: 200,
    });
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    console.log(`[${requestId}] Method ${req.method} not allowed`);
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
      const rawBody = await req.text();
      console.log(
        `[${requestId}] Raw request body:`,
        rawBody.substring(0, 200) + "...",
      );
      requestBody = JSON.parse(rawBody);
    } catch (error) {
      console.error(`[${requestId}] JSON parse error:`, error);
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
    console.log(`[${requestId}] Processing request for user:`, userId);
    console.log(`[${requestId}] Message:`, message?.substring(0, 100) + "...");
    console.log(
      `[${requestId}] Chat history length:`,
      chatHistory?.length || 0,
    );

    // Validate input
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      console.log(`[${requestId}] Empty or invalid message`);
      return new Response(
        JSON.stringify({
          error: "Empty message",
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
      console.log(`[${requestId}] Invalid chat history format`);
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
      console.error(`[${requestId}] OpenRouter API key not configured`);
      return new Response(
        JSON.stringify({
          error: "API key missing",
          response:
            "❌ OpenRouter API key is niet geconfigureerd. Neem contact op met de beheerder.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log(
      `[${requestId}] API key found:`,
      OPENROUTER_API_KEY.substring(0, 10) + "...",
    );

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

    console.log(
      `[${requestId}] Sending ${messages.length} messages to OpenRouter`,
    );
    console.log(`[${requestId}] OpenRouter request:`, {
      model: OPENROUTER_MODEL,
      messagesCount: messages.length,
      lastMessage: messages[messages.length - 1],
    });

    // Prepare OpenRouter request
    const openRouterRequest = {
      model: OPENROUTER_MODEL,
      messages: messages,
      max_tokens: 400,
      temperature: 0.7,
      stream: false,
      top_p: 0.9,
    };

    console.log(`[${requestId}] Making request to OpenRouter...`);

    // Send request to OpenRouter
    const openRouterResponse = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://focusflow.app",
        "X-Title": "FocusFlow AI Coach",
      },
      body: JSON.stringify(openRouterRequest),
    });

    console.log(
      `[${requestId}] OpenRouter response status:`,
      openRouterResponse.status,
    );
    console.log(
      `[${requestId}] OpenRouter response headers:`,
      Object.fromEntries(openRouterResponse.headers.entries()),
    );

    // Check response status
    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();
      console.error(`[${requestId}] OpenRouter API error:`, {
        status: openRouterResponse.status,
        statusText: openRouterResponse.statusText,
        body: errorText,
      });

      return new Response(
        JSON.stringify({
          error: `OpenRouter API error: ${openRouterResponse.status}`,
          response: `❌ OpenRouter API gaf een fout terug (${openRouterResponse.status}). Dit kan betekenen dat de API key ongeldig is of dat er een tijdelijk probleem is met OpenRouter.`,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Parse OpenRouter response
    const responseText = await openRouterResponse.text();
    console.log(
      `[${requestId}] OpenRouter raw response:`,
      responseText.substring(0, 500) + "...",
    );

    let aiData;
    try {
      aiData = JSON.parse(responseText);
    } catch (error) {
      console.error(
        `[${requestId}] Failed to parse OpenRouter response:`,
        error,
      );
      return new Response(
        JSON.stringify({
          error: "Invalid response from OpenRouter",
          response:
            "❌ OpenRouter gaf een ongeldig antwoord terug. Probeer het opnieuw.",
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log(`[${requestId}] OpenRouter parsed response:`, {
      choices: aiData.choices?.length || 0,
      usage: aiData.usage,
      error: aiData.error,
    });

    // Check for OpenRouter API errors
    if (aiData.error) {
      console.error(
        `[${requestId}] OpenRouter returned API error:`,
        aiData.error,
      );
      return new Response(
        JSON.stringify({
          error: `OpenRouter API error: ${aiData.error.message || aiData.error}`,
          response: `❌ OpenRouter API fout: ${aiData.error.message || aiData.error}`,
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Extract AI response
    const aiResponse = aiData?.choices?.[0]?.message?.content?.trim();

    if (!aiResponse || aiResponse.length === 0) {
      console.error(`[${requestId}] Empty AI response from OpenRouter`);
      console.error(`[${requestId}] Full response:`, aiData);
      return new Response(
        JSON.stringify({
          error: "Empty response from OpenRouter",
          response:
            "❌ OpenRouter gaf een leeg antwoord terug. Probeer het opnieuw.",
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    console.log(
      `[${requestId}] ✅ Generated AI response successfully:`,
      aiResponse.substring(0, 100) + "...",
    );
    console.log(`[${requestId}] Usage:`, aiData.usage);

    // Return successful response
    return new Response(
      JSON.stringify({
        response: aiResponse,
        usage: aiData.usage,
        model: OPENROUTER_MODEL,
        requestId: requestId,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error(
      `[${requestId}] ❌ Unexpected error in AI chat function:`,
      error,
    );
    console.error(`[${requestId}] Error stack:`, error.stack);

    return new Response(
      JSON.stringify({
        error: `Unexpected error: ${error.message}`,
        response: `❌ Er ging iets onverwachts mis: ${error.message}. Neem contact op met de ontwikkelaars.`,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
