// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
  clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET || "",
  redirectUri: `${window.location.origin}/auth/google/callback`,
  scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.readonly openid profile email",
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
  private readonly STORAGE_KEY = "google_oauth_tokens";
  private readonly CONNECTION_KEY = "google_connected";

  async signIn(): Promise<{ profile: GoogleProfile; tokens: GoogleTokens } | null> {
    try {
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
        GOOGLE_CONFIG.clientId
      }&response_type=code&redirect_uri=${encodeURIComponent(
        GOOGLE_CONFIG.redirectUri
      )}&scope=${encodeURIComponent(GOOGLE_CONFIG.scope)}&access_type=offline&prompt=consent`;

      const popup = window.open(authUrl, "google-oauth", "width=500,height=600");
      if (!popup) {
        throw new Error("Popup blocked. Please allow popups for Google login.");
      }

      return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          try {
            if (popup.closed) {
              clearInterval(interval);
              const tokens = this.getStoredTokens();
              if (tokens) {
                const profile = await this.getUserProfile(tokens.access_token);
                resolve({ profile, tokens });
              } else {
                reject(new Error("Authentication failed"));
              }
            }
          } catch (error) {
            clearInterval(interval);
            reject(error);
          }
        }, 1000);
      });
    } catch (error) {
      console.error("Google OAuth error:", error);
      return null;
    }
  }

  async signOut(): Promise<void> {
    try {
      const tokens = this.getStoredTokens();
      if (tokens?.access_token) {
        await fetch(`https://oauth2.googleapis.com/revoke?token=${tokens.access_token}`, {
          method: "POST",
        });
      }
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.CONNECTION_KEY);
    } catch (error) {
      console.error("Google sign out error:", error);
    }
  }

  async getValidAccessToken(): Promise<string | null> {
    const tokens = this.getStoredTokens();
    if (!tokens) return null;

    if (this.isTokenExpired(tokens)) {
      const refreshedTokens = await this.refreshTokens(tokens.refresh_token);
      if (refreshedTokens) {
        this.storeTokens(refreshedTokens);
        return refreshedTokens.access_token;
      }
      return null;
    }

    return tokens.access_token;
  }

  isSignedIn(): boolean {
    const connected = localStorage.getItem(this.CONNECTION_KEY) === "true";
    const tokens = this.getStoredTokens();
    return connected && !!tokens && !this.isTokenExpired(tokens);
  }

  isConnected(): boolean {
    return this.isSignedIn();
  }

  private async getUserProfile(accessToken: string): Promise<GoogleProfile> {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

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

  private async refreshTokens(refreshToken?: string): Promise<GoogleTokens | null> {
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
