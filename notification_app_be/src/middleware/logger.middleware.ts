import { Request, Response, NextFunction } from "express";
import { Log, setAuthToken } from "@logging/index";
import { getValidToken } from "../auth/authService";
export async function requestLogger(req: Request, res: Response, next: NextFunction): Promise<void> {
  const start = Date.now();
  try { const t = await getValidToken(); setAuthToken(t); } catch {}
  Log("backend", "info", "middleware", req.method + " " + req.path + " query=" + JSON.stringify(req.query));
  res.on("finish", () => {
    const level = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
    Log("backend", level, "middleware", req.method + " " + req.path + " -> " + res.statusCode + " (" + (Date.now() - start) + "ms)");
  });
  next();
}

