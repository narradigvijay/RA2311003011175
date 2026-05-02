import axios from "axios";
import { config } from "../config/env";
import { getValidToken } from "../auth/authService";
import { setAuthToken, Log } from "@logging/index";
import { Notification, getTopN, ScoredNotification } from "./priority.service";
export async function fetchNotifications(params: any = {}): Promise<Notification[]> {
  const token = await getValidToken();
  setAuthToken(token);
  Log("backend", "info", "service", "Fetching notifications params=" + JSON.stringify(params));
  const res = await axios.get(config.testServerBaseUrl + "/notifications", {
    headers: { Authorization: "Bearer " + token },
    params,
  });
  const notifications: Notification[] = res.data.notifications || [];
  Log("backend", "info", "service", "Fetched " + notifications.length + " notifications");
  return notifications;
}
export async function fetchPriorityNotifications(n = 10): Promise<ScoredNotification[]> {
  Log("backend", "info", "service", "Computing top " + n + " priority notifications");
  const notifications = await fetchNotifications();
  const result = getTopN(notifications, n);
  Log("backend", "info", "service", "Priority inbox ready: " + result.length + " items");
  return result;
}

