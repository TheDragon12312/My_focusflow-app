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
}> {
  try {
    console.log("🧪 Testing OpenRouter AI connection...");

    const testMessage =
      "Hoi! Dit is een test bericht. Antwoord kort met 'Test succesvol!'";

    const { data, error } = await supabase.functions.invoke("ai-coach-chat", {
      body: {
        message: testMessage,
        chatHistory: [],
        userId: "test-user",
      },
    });

    console.log("🧪 Test response:", { data, error });

    if (error) {
      return {
        success: false,
        message: "Supabase function call failed",
        error: JSON.stringify(error),
      };
    }

    if (!data) {
      return {
        success: false,
        message: "No data received from function",
        error: "Empty response",
      };
    }

    if (!data.response) {
      return {
        success: false,
        message: "No AI response in data",
        error: JSON.stringify(data),
      };
    }

    return {
      success: true,
      message: "OpenRouter AI connection successful!",
      response: data.response,
    };
  } catch (error) {
    console.error("🧪 Test failed:", error);
    return {
      success: false,
      message: "Test threw an exception",
      error: error instanceof Error ? error.message : String(error),
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
