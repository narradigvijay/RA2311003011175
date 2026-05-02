import { Request, Response } from "express";
import { fetchNotifications, fetchPriorityNotifications } from "../services/notifications.service";
import { Log } from "@logging/index";
export async function getAllNotifications(req: Request, res: Response): Promise<void> {
  try {
    Log("backend", "debug", "controller", "getAllNotifications called");
    const { limit, page, notification_type } = req.query;
    const data = await fetchNotifications({
      ...(limit && { limit: Number(limit) }),
      ...(page && { page: Number(page) }),
      ...(notification_type && { notification_type }),
    });
    res.status(200).json({ notifications: data });
  } catch (err: any) {
    Log("backend", "error", "controller", "getAllNotifications failed: " + err.message);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
}
export async function getPriorityNotifications(req: Request, res: Response): Promise<void> {
  try {
    const n = req.query.n ? Number(req.query.n) : 10;
    Log("backend", "debug", "controller", "getPriorityNotifications n=" + n);
    const data = await fetchPriorityNotifications(n);
    res.status(200).json({ notifications: data, count: data.length });
  } catch (err: any) {
    Log("backend", "error", "controller", "getPriorityNotifications failed: " + err.message);
    res.status(500).json({ error: "Failed to fetch priority notifications" });
  }
}

