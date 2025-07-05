import { supabase } from "@/integrations/supabase/client";

/**
 * Test of de Supabase function correct is gedeployed
 */
export async function testFunctionDeployment() {
  console.log("🚀 Testing function deployment...");

  try {
    const testPayload = {
      message:
        "Test deployment: Antwoord met 'Function werkt!' als je dit via OpenRouter krijgt.",
      chatHistory: [],
      userId: "deployment-test",
    };

    console.log("📤 Sending test request:", testPayload);

    const { data, error } = await supabase.functions.invoke("ai-coach-chat", {
      body: testPayload,
    });

    console.log("📥 Function response:", { data, error });

    if (error) {
      console.error("❌ Function call error:", error);
      return {
        success: false,
        error: "Function call failed",
        details: error,
      };
    }

    if (!data) {
      console.error("❌ No data received");
      return {
        success: false,
        error: "No data received",
        details: null,
      };
    }

    if (!data.response) {
      console.error("❌ No response field in data:", data);
      return {
        success: false,
        error: "No response field",
        details: data,
      };
    }

    const response = data.response;
    console.log("📝 AI Response:", response);

    // Check for error indicators
    if (
      response.includes("❌") ||
      response.includes("error") ||
      response.includes("fout")
    ) {
      return {
        success: false,
        error: "Function returned error response",
        details: response,
      };
    }

    // Check if it's a fallback response
    if (
      response.includes("problemen met mijn verbinding") ||
      response.includes("technische storing")
    ) {
      return {
        success: false,
        error: "Function returned fallback response - OpenRouter not working",
        details: response,
      };
    }

    return {
      success: true,
      response: response,
      details: data,
    };
  } catch (error) {
    console.error("❌ Test failed:", error);
    return {
      success: false,
      error: "Test threw exception",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Comprehensive deployment check
 */
export async function checkDeployment() {
  console.log("🔍 Running comprehensive deployment check...");

  const result = await testFunctionDeployment();

  if (result.success) {
    console.log("✅ DEPLOYMENT SUCCESS!");
    console.log("🤖 AI Response:", result.response);
    console.log("💡 The function is working correctly with OpenRouter!");
  } else {
    console.error("❌ DEPLOYMENT FAILED!");
    console.error("🔍 Error:", result.error);
    console.error("📝 Details:", result.details);

    console.log("\n🛠️ TROUBLESHOOTING STEPS:");
    console.log(
      "1. Deploy the function: supabase functions deploy ai-coach-chat",
    );
    console.log("2. Check API key in Supabase dashboard");
    console.log("3. Verify function logs in Supabase dashboard");
  }

  return result;
}

// Make available globally
if (typeof window !== "undefined") {
  (window as any).testDeployment = checkDeployment;
  (window as any).testFunctionDeployment = testFunctionDeployment;
}
