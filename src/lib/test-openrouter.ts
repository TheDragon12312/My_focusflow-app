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
 * Voer de test uit in de browser console
 * Gebruik: testAndLog()
 */
export async function testAndLog() {
  const result = await testOpenRouterConnection();

  if (result.success) {
    console.log("✅ OpenRouter Test SUCCESVOL!");
    console.log("📝 AI Response:", result.response);
  } else {
    console.error("❌ OpenRouter Test GEFAALD!");
    console.error("📝 Error:", result.error);
    console.error("📝 Message:", result.message);
  }

  return result;
}

// Maak functies globally beschikbaar voor debugging
if (typeof window !== "undefined") {
  (window as any).testOpenRouter = testAndLog;
  (window as any).testOpenRouterConnection = testOpenRouterConnection;
}
