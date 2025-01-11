import axios from 'axios';

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getAccessToken(): Promise<string> {
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    console.log('Returning cached token');
    return cachedToken;
  }

  const clientId = process.env.TWITCH_CLIENT_ID!;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET!;
  const url = 'https://id.twitch.tv/oauth2/token';

  try {
    const response = await axios.post(url, null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      },
    });

    cachedToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000;

    return cachedToken as string;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Authentication error');
  }
}
