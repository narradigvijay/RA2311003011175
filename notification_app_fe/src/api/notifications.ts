import axios from "axios";
const BE_BASE = "http://localhost:5000/api";
export interface Notification {
  ID: string;
  Type: "Event" | "Result" | "Placement";
  Message: string;
  Timestamp: string;
  score?: number;
}
export async function fetchAllNotifications(params: {
  limit?: number;
  page?: number;
  notification_type?: string;
} = {}): Promise<Notification[]> {
  const res = await axios.get(`${BE_BASE}/notifications`, { params });
  return res.data.notifications || [];
}
export async function fetchPriorityNotifications(n = 10): Promise<Notification[]> {
  const res = await axios.get(`${BE_BASE}/notifications/priority`, { params: { n } });
  return res.data.notifications || [];
}