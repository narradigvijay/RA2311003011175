import dotenv from 'dotenv';
dotenv.config();
export const config = {
  port: process.env.PORT || 5000,
  testServerBaseUrl: process.env.TEST_SERVER_BASE_URL || '',
  clientId: process.env.CLIENT_ID || '',
  clientSecret: process.env.CLIENT_SECRET || '',
  email: process.env.EMAIL || '',
  name: process.env.NAME || '',
  rollNo: process.env.ROLL_NO || '',
  accessCode: process.env.ACCESS_CODE || '',
};
