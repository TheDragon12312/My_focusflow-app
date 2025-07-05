import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

console.log("🚀 AI Coach Chat function starting...");

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

serve(async (req: Request) => {
  const requestId = Math.random().toString(36).substring(2, 8);
  console.log(`[${requestId}] ${req.method} ${req.url}`);

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    console.log(`[${requestId}] CORS preflight`);
    return new Response(null, { headers: corsHeaders, status: 200 });
  }

  if (req.method !== "POST") {
    console.log(`[${requestId}] Method not allowed: ${req.method}`);
    return new Response(
      JSON.stringify({ response: "Alleen POST requests toegestaan" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    // Parse request
    const body = await req.json();
    console.log(`[${requestId}] Request body:`, {
      message: body.message?.substring(0, 50) + "...",
      userId: body.userId,
      historyLength: body.chatHistory?.length || 0,
    });

    const { message, chatHistory = [], userId } = body;

    if (!message?.trim()) {
      console.log(`[${requestId}] Empty message`);
      return new Response(JSON.stringify({ response: "Bericht is leeg" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // OpenRouter API configuration
    const API_KEY =
      Deno.env.get("OPENROUTER_API_KEY") ||
      "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";
    const API_URL = "https://openrouter.ai/api/v1/chat/completions";
    const MODEL = "deepseek/deepseek-r1-0528-qwen3-8b";

    console.log(`[${requestId}] Using API key: ${API_KEY.substring(0, 10)}...`);

    // Build messages for OpenRouter
    const messages = [
      {
        role: "system",
        content:
          "Je bent een vriendelijke AI-productiviteitscoach voor FocusFlow. Help gebruikers met focus, motivatie en planning. Antwoord in het Nederlands, gebruik emoji's en wees praktisch.",
      },
    ];

    // Add chat history (last 5 messages)
    const recentHistory = chatHistory.slice(-5);
    for (const item of recentHistory) {
      if (item.role && item.message) {
        messages.push({
          role: item.role,
          content: item.message,
        });
      }
    }

    // Add current message
    messages.push({
      role: "user",
      content: message.trim(),
    });

    console.log(
      `[${requestId}] Sending ${messages.length} messages to OpenRouter`,
    );

    // Call OpenRouter API
    const openRouterResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://focusflow.app",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    console.log(
      `[${requestId}] OpenRouter status: ${openRouterResponse.status}`,
    );

    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();
      console.error(`[${requestId}] OpenRouter error:`, errorText);

      return new Response(
        JSON.stringify({
          response: `❌ OpenRouter API fout (${openRouterResponse.status}): Controleer API key en model beschikbaarheid.`,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const openRouterData = await openRouterResponse.json();
    console.log(`[${requestId}] OpenRouter response:`, {
      choices: openRouterData.choices?.length || 0,
      usage: openRouterData.usage,
    });

    const aiMessage = openRouterData?.choices?.[0]?.message?.content?.trim();

    if (!aiMessage) {
      console.error(
        `[${requestId}] No AI message in response:`,
        openRouterData,
      );
      return new Response(
        JSON.stringify({
          response:
            "❌ OpenRouter gaf geen antwoord terug. Probeer het opnieuw.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.log(
      `[${requestId}] ✅ Success! AI response: ${aiMessage.substring(0, 100)}...`,
    );

    return new Response(
      JSON.stringify({
        response: aiMessage,
        model: MODEL,
        usage: openRouterData.usage,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error(`[${requestId}] ❌ Unexpected error:`, error);
    return new Response(
      JSON.stringify({
        response: `❌ Function error: ${error.message}`,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
