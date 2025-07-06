import { supabase } from "@/integrations/supabase/client";

// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  scope: "https://www.googleapis.com/auth/calendar.readonly",
};

export interface GoogleProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

export interface GoogleTokens {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  token_type: string;
  expires_at?: number;
}

class GoogleOAuthService {
  async signIn(): Promise<{
    profile: GoogleProfile;
    tokens: GoogleTokens;
  } | null> {
    try {
      // Use Supabase Auth with Google provider
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          scopes: "https://www.googleapis.com/auth/calendar.readonly",
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        throw error;
      }

      // The actual token handling will be done in the OAuth callback
      // For now, we'll return a success indicator
      return { profile: null as any, tokens: null as any };
    } catch (error) {
      console.error("Google OAuth error:", error);
      throw new Error("Authentication failed");
    }
  }

  async signOut(): Promise<void> {
    try {
      // Sign out from Supabase Auth
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Google sign out error:", error);
    }
  }

  async getValidAccessToken(): Promise<string | null> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.provider_token) {
        return null;
      }

      // Check if we need to refresh the token
      if (
        session.expires_at &&
        session.expires_at * 1000 < Date.now() + 60000
      ) {
        const {
          data: { session: refreshedSession },
        } = await supabase.auth.refreshSession();
        return refreshedSession?.provider_token || null;
      }

      return session.provider_token;
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  }

  async isSignedIn(): Promise<boolean> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      return !!session?.provider_token;
    } catch {
      return false;
    }
  }

  isConnected(): boolean {
    // This needs to be synchronous for compatibility
    // We'll check localStorage for session indication
    try {
      const session = localStorage.getItem(
        "sb-cwgnlsrqnyugloobrsxz-auth-token",
      );
      return !!session;
    } catch {
      return false;
    }
  }

  async getUserProfile(): Promise<GoogleProfile | null> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return null;

      return {
        id: user.id,
        email: user.email || "",
        name: user.user_metadata?.full_name || user.email || "",
        picture: user.user_metadata?.avatar_url,
        given_name: user.user_metadata?.given_name,
        family_name: user.user_metadata?.family_name,
      };
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  }
}

export const googleOAuth = new GoogleOAuthService();

// Make it available globally for debugging
(window as any).googleOAuth = googleOAuth;
