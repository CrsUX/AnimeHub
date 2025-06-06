import { STREAMING_CONFIG } from '../../config/streaming';

export class RealDebridAuth {
  private static instance: RealDebridAuth;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {}

  static getInstance(): RealDebridAuth {
    if (!RealDebridAuth.instance) {
      RealDebridAuth.instance = new RealDebridAuth();
    }
    return RealDebridAuth.instance;
  }

  async authorize(): Promise<void> {
    const params = new URLSearchParams({
      client_id: STREAMING_CONFIG.REALDEBRID.CLIENT_ID,
      redirect_uri: STREAMING_CONFIG.REALDEBRID.REDIRECT_URI,
      response_type: 'code',
      state: this.generateState()
    });

    window.location.href = `${STREAMING_CONFIG.REALDEBRID.AUTH_URL}?${params}`;
  }

  async handleCallback(code: string): Promise<void> {
    const params = new URLSearchParams({
      client_id: STREAMING_CONFIG.REALDEBRID.CLIENT_ID,
      client_secret: STREAMING_CONFIG.REALDEBRID.CLIENT_SECRET,
      code,
      redirect_uri: STREAMING_CONFIG.REALDEBRID.REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const response = await fetch(STREAMING_CONFIG.REALDEBRID.TOKEN_URL, {
      method: 'POST',
      body: params
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    this.setTokens(data.access_token, data.refresh_token);
  }

  async refreshAccessToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }

    const params = new URLSearchParams({
      client_id: STREAMING_CONFIG.REALDEBRID.CLIENT_ID,
      client_secret: STREAMING_CONFIG.REALDEBRID.CLIENT_SECRET,
      refresh_token: this.refreshToken,
      grant_type: 'refresh_token'
    });

    const response = await fetch(STREAMING_CONFIG.REALDEBRID.TOKEN_URL, {
      method: 'POST',
      body: params
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    this.setTokens(data.access_token, data.refresh_token);
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('rd_access_token', accessToken);
    localStorage.setItem('rd_refresh_token', refreshToken);
  }

  private generateState(): string {
    return Math.random().toString(36).substring(2);
  }
}