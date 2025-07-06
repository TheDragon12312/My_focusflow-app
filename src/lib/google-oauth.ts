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
        "sb-" + supabase.supabaseKey + "-auth-token",
      );
      return !!session;
    } catch {
      return false;
    }
  }

  private async getUserProfile(accessToken: string): Promise<GoogleProfile> {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to get user profile");
    }

    return response.json();
  }

  private storeTokens(tokens: GoogleTokens): void {
    const tokenData = {
      ...tokens,
      expires_at: tokens.expires_at || Date.now() + tokens.expires_in * 1000,
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tokenData));
    localStorage.setItem(this.CONNECTION_KEY, "true");
  }

  private getStoredTokens(): (GoogleTokens & { expires_at: number }) | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private isTokenExpired(tokens: { expires_at: number }): boolean {
    return Date.now() >= tokens.expires_at - 60000; // 1 minute buffer
  }

  private async refreshTokens(
    refreshToken?: string,
  ): Promise<GoogleTokens | null> {
    if (!refreshToken) return null;

    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: GOOGLE_CONFIG.clientId,
          client_secret: GOOGLE_CONFIG.clientSecret,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh tokens");
      }

      const newTokens = await response.json();
      newTokens.expires_at = Date.now() + newTokens.expires_in * 1000;
      return newTokens;
    } catch (error) {
      console.error("Token refresh error:", error);
      return null;
    }
  }
}

export const googleOAuth = new GoogleOAuthService();

// Make it available globally for debugging
(window as any).googleOAuth = googleOAuth;
