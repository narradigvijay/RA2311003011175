import axios from 'axios';
import { config } from '../config/env';
let cachedToken: string | null = null;
let tokenExpiry: number = 0;
export async function getValidToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry - 60000) {
    return cachedToken;
  }
  const res = await axios.post(config.testServerBaseUrl + '/auth', {
    email: config.email,
    name: config.name,
    rollNo: config.rollNo,
    accessCode: config.accessCode,
    clientID: config.clientId,
    clientSecret: config.clientSecret,
  });
  cachedToken = res.data.access_token;
  tokenExpiry = res.data.expires_in * 1000;
  console.log('[Auth] Token refreshed successfully');
  return cachedToken!;
}
