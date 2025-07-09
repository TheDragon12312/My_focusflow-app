import { GoogleGenerativeAI } from "@google/generative-ai";

// Google AI configuratie
const API_KEY = "AIzaSyAW65ss1aUDSFkM9apP9zxRycAvZ3WUV7U";
const MODEL_NAME = "gemini-1.5-flash";

// Initialiseer Google AI
const genAI = new GoogleGenerativeAI(API_KEY);

// System instructie voor de AI coach
const SYSTEM_INSTRUCTION = `Je bent een vriendelijke en praktische AI-productiviteitscoach voor FocusFlow. 

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

Antwoord altijd in het Nederlands en wees praktisch en motiverend.`;

export interface ChatMessage {
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

export class GoogleAIService {
  private model: any;
  private chatSession: any = null;
  private chatHistory: ChatMessage[] = [];

  constructor() {
    this.model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 400,
      },
    });
  }

  /**
   * Initialiseer een nieuwe chat sessie
   */
  async initializeChat(): Promise<void> {
    try {
      this.chatSession = this.model.startChat({
        history: [],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 400,
        },
      });

      // Voeg welkomstbericht toe
      const welcomeMessage: ChatMessage = {
        role: "model",
        content:
          "Hallo! Ik ben je persoonlijke AI-productiviteitscoach. Ik help je graag met focus, motivatie, planning en alles wat met productiviteit te maken heeft. Waar kan ik je vandaag mee helpen? 😊",
        timestamp: new Date(),
      };

      this.chatHistory = [welcomeMessage];

      console.log("✅ Google AI chat geïnitialiseerd");
    } catch (error) {
      console.error("❌ Fout bij initialiseren Google AI chat:", error);
      throw new Error(
        "Kon geen verbinding maken met Google AI. Controleer je internetverbinding.",
      );
    }
  }

  /**
   * Verstuur een bericht naar Google AI
   */
  async sendMessage(message: string): Promise<string> {
    if (!this.chatSession) {
      throw new Error(
        "Chat sessie niet geïnitialiseerd. Roep eerst initializeChat() aan.",
      );
    }

    if (!message.trim()) {
      throw new Error("Bericht mag niet leeg zijn.");
    }

    try {
      console.log(
        "📤 Versturen naar Google AI:",
        message.substring(0, 50) + "...",
      );

      // Voeg gebruikersbericht toe aan geschiedenis
      const userMessage: ChatMessage = {
        role: "user",
        content: message.trim(),
        timestamp: new Date(),
      };
      this.chatHistory.push(userMessage);

      // Verstuur naar Google AI
      const result = await this.chatSession.sendMessage(message.trim());
      const response = result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        throw new Error("Google AI gaf een leeg antwoord terug.");
      }

      // Voeg AI antwoord toe aan geschiedenis
      const aiMessage: ChatMessage = {
        role: "model",
        content: text.trim(),
        timestamp: new Date(),
      };
      this.chatHistory.push(aiMessage);

      console.log(
        "✅ Antwoord ontvangen van Google AI:",
        text.substring(0, 100) + "...",
      );

      return text.trim();
    } catch (error) {
      console.error("❌ Fout bij versturen bericht naar Google AI:", error);

      // Geef een vriendelijke fallback response
      const fallbackResponse =
        "Sorry, ik kan je vraag momenteel niet beantwoorden. Dit kan komen door een tijdelijk verbindingsprobleem. Probeer het over een paar seconden opnieuw. 🔄";

      const fallbackMessage: ChatMessage = {
        role: "model",
        content: fallbackResponse,
        timestamp: new Date(),
      };
      this.chatHistory.push(fallbackMessage);

      return fallbackResponse;
    }
  }

  /**
   * Verstuur een bericht met streaming response
   */
  async sendMessageStream(
    message: string,
  ): Promise<AsyncIterable<{ text: string }>> {
    if (!this.chatSession) {
      throw new Error(
        "Chat sessie niet geïnitialiseerd. Roep eerst initializeChat() aan.",
      );
    }

    if (!message.trim()) {
      throw new Error("Bericht mag niet leeg zijn.");
    }

    try {
      console.log(
        "📤 Versturen naar Google AI (streaming):",
        message.substring(0, 50) + "...",
      );

      // Voeg gebruikersbericht toe aan geschiedenis
      const userMessage: ChatMessage = {
        role: "user",
        content: message.trim(),
        timestamp: new Date(),
      };
      this.chatHistory.push(userMessage);

      // Verstuur naar Google AI met streaming
      const result = await this.chatSession.sendMessageStream(message.trim());

      let fullResponse = "";

      // Maak een async generator voor streaming
      const streamGenerator = async function* () {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          fullResponse += chunkText;
          yield { text: chunkText };
        }
      };

      // Voeg complete response toe aan geschiedenis nadat streaming klaar is
      const originalGenerator = streamGenerator();
      const wrappedGenerator = async function* () {
        for await (const chunk of originalGenerator) {
          yield chunk;
        }

        // Voeg complete response toe aan geschiedenis
        if (fullResponse.trim()) {
          const aiMessage: ChatMessage = {
            role: "model",
            content: fullResponse.trim(),
            timestamp: new Date(),
          };
          // We kunnen de geschiedenis niet updaten vanuit een generator
          // Dit wordt gedaan in de component die de stream gebruikt
        }
      };

      return wrappedGenerator();
    } catch (error) {
      console.error("❌ Fout bij streaming naar Google AI:", error);

      // Return een fallback als async generator
      const fallbackResponse =
        "Sorry, ik kan je vraag momenteel niet beantwoorden. Probeer het opnieuw. 🔄";

      const fallbackMessage: ChatMessage = {
        role: "model",
        content: fallbackResponse,
        timestamp: new Date(),
      };
      this.chatHistory.push(fallbackMessage);

      return (async function* () {
        yield { text: fallbackResponse };
      })();
    }
  }

  /**
   * Krijg de chat geschiedenis
   */
  getChatHistory(): ChatMessage[] {
    return [...this.chatHistory];
  }

  /**
   * Wis de chat geschiedenis
   */
  clearHistory(): void {
    this.chatHistory = [];
    // Herstart de chat sessie
    this.initializeChat();
  }

  /**
   * Voeg een bericht toe aan de geschiedenis (voor streaming responses)
   */
  addToHistory(message: ChatMessage): void {
    this.chatHistory.push(message);
  }

  /**
   * Test de Google AI verbinding
   */
  async testConnection(): Promise<{
    success: boolean;
    message: string;
    response?: string;
  }> {
    try {
      console.log("🧪 Testen Google AI verbinding...");

      const testModel = genAI.getGenerativeModel({ model: MODEL_NAME });
      const result = await testModel.generateContent(
        'Test: Antwoord alleen met "Google AI werkt!" in het Nederlands',
      );
      const response = result.response.text();

      if (response && response.trim().length > 0) {
        return {
          success: true,
          message: "Google AI verbinding succesvol!",
          response: response.trim(),
        };
      } else {
        return {
          success: false,
          message: "Google AI gaf geen antwoord terug",
        };
      }
    } catch (error) {
      console.error("🧪 Google AI test gefaald:", error);
      return {
        success: false,
        message: `Google AI test gefaald: ${error instanceof Error ? error.message : "Onbekende fout"}`,
      };
    }
  }
}

// Singleton instance
export const googleAIService = new GoogleAIService();

// Maak test functie global beschikbaar
if (typeof window !== "undefined") {
  (window as any).testGoogleAI = () => googleAIService.testConnection();
  (window as any).googleAIService = googleAIService;
}
