import { supabase } from "@/integrations/supabase/client";

/**
 * Test functie om OpenRouter AI connectie te controleren
 * Deze functie kan worden gebruikt om te debuggen of de API werkt
 */
export async function testOpenRouterConnection(): Promise<{
  success: boolean;
  message: string;
  response?: string;
  error?: string;
  fullData?: any;
}> {
  try {
    console.log("🧪 Testing OpenRouter AI connection...");

    const testMessage =
      "Test bericht: Zeg alleen 'OpenRouter werkt!' als je dit via OpenRouter ontvangt.";

    console.log("🧪 Sending test request to ai-coach-chat function...");

    const { data, error } = await supabase.functions.invoke("ai-coach-chat", {
      body: {
        message: testMessage,
        chatHistory: [],
        userId: "test-user-debug",
      },
    });

    console.log("🧪 Function response:", { data, error });
    console.log("🧪 Full data object:", data);

    if (error) {
      console.error("🧪 Supabase function error:", error);
      return {
        success: false,
        message: "Supabase function call failed",
        error: JSON.stringify(error, null, 2),
        fullData: { data, error },
      };
    }

    if (!data) {
      return {
        success: false,
        message: "No data received from function",
        error: "Empty response",
        fullData: { data, error },
      };
    }

    // Check if we have a response
    if (!data.response) {
      return {
        success: false,
        message: "No AI response in data",
        error: "Missing response field",
        fullData: data,
      };
    }

    // Check if this is a fallback response (contains certain keywords)
    const response = data.response;
    const isFallback =
      response.includes("problemen met mijn verbinding") ||
      response.includes("technische storing") ||
      response.includes("kan je momenteel niet helpen") ||
      response.includes("API key");

    if (isFallback) {
      return {
        success: false,
        message: "Received fallback response instead of OpenRouter AI",
        error: "OpenRouter API call is failing inside the function",
        response: response,
        fullData: data,
      };
    }

    // Check for specific success indicators
    const isOpenRouterResponse =
      response.includes("OpenRouter werkt!") || response.length > 50; // Real AI responses are usually longer

    return {
      success: isOpenRouterResponse,
      message: isOpenRouterResponse
        ? "OpenRouter AI connection successful!"
        : "Received response but may be fallback",
      response: response,
      fullData: data,
    };
  } catch (error) {
    console.error("🧪 Test failed with exception:", error);
    return {
      success: false,
      message: "Test threw an exception",
      error: error instanceof Error ? error.message : String(error),
      fullData: null,
    };
  }
}

/**
 * Test directe verbinding met OpenRouter API (bypass Supabase)
 */
export async function testDirectOpenRouterAPI(): Promise<{
  success: boolean;
  message: string;
  response?: string;
  error?: string;
}> {
  try {
    console.log("🧪 Testing direct OpenRouter API connection...");

    const API_KEY =
      "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";

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://focusflow.app",
          "X-Title": "FocusFlow AI Coach Test",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
          messages: [
            {
              role: "user",
              content: "Test: Antwoord alleen met 'DirectOpenRouter werkt!'",
            },
          ],
          max_tokens: 50,
          temperature: 0.7,
        }),
      },
    );

    console.log("🧪 Direct API response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("🧪 Direct API error:", errorText);
      return {
        success: false,
        message: `Direct OpenRouter API failed with status ${response.status}`,
        error: errorText,
      };
    }

    const data = await response.json();
    console.log("🧪 Direct API response data:", data);

    const aiResponse = data?.choices?.[0]?.message?.content?.trim();

    if (!aiResponse) {
      return {
        success: false,
        message: "No response content from direct API",
        error: JSON.stringify(data),
      };
    }

    return {
      success: true,
      message: "Direct OpenRouter API connection successful!",
      response: aiResponse,
    };
  } catch (error) {
    console.error("🧪 Direct API test failed:", error);
    return {
      success: false,
      message: "Direct API test threw an exception",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Voer de test uit in de browser console
 * Gebruik: testAndLog()
 */
export async function testAndLog() {
  console.log("🧪 Running comprehensive OpenRouter tests...");

  // Test 1: Direct API
  console.log("\n1️⃣ Testing direct OpenRouter API...");
  const directResult = await testDirectOpenRouterAPI();

  if (directResult.success) {
    console.log("✅ Direct OpenRouter API WERKT!");
    console.log("📝 Direct Response:", directResult.response);
  } else {
    console.error("❌ Direct OpenRouter API GEFAALD!");
    console.error("📝 Error:", directResult.error);
  }

  // Test 2: Via Supabase function
  console.log("\n2️⃣ Testing via Supabase function...");
  const functionResult = await testOpenRouterConnection();

  if (functionResult.success) {
    console.log("✅ Supabase Function Test SUCCESVOL!");
    console.log("📝 Function Response:", functionResult.response);
  } else {
    console.error("❌ Supabase Function Test GEFAALD!");
    console.error("📝 Error:", functionResult.error);
    console.error("📝 Message:", functionResult.message);
    console.error("📝 Full Data:", functionResult.fullData);
  }

  // Summary
  console.log("\n📊 TEST SAMENVATTING:");
  console.log("Direct API:", directResult.success ? "✅ WERKT" : "❌ FAALT");
  console.log(
    "Supabase Function:",
    functionResult.success ? "✅ WERKT" : "❌ FAALT",
  );

  if (directResult.success && !functionResult.success) {
    console.log(
      "🔍 DIAGNOSE: OpenRouter API werkt, maar Supabase function heeft een probleem",
    );
    console.log(
      "💡 OPLOSSING: Deploy de function opnieuw met: supabase functions deploy ai-coach-chat",
    );
  } else if (!directResult.success) {
    console.log("🔍 DIAGNOSE: OpenRouter API zelf is niet bereikbaar");
    console.log("💡 OPLOSSING: Controleer API key en netwerk verbinding");
  }

  return { directResult, functionResult };
}

// Maak functies globally beschikbaar voor debugging
if (typeof window !== "undefined") {
  (window as any).testOpenRouter = testAndLog;
  (window as any).testOpenRouterConnection = testOpenRouterConnection;
  (window as any).testDirectOpenRouterAPI = testDirectOpenRouterAPI;
  (window as any).testOpenRouterFull = testAndLog;
}
