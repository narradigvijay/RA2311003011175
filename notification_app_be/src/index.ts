import express from "express";
import cors from "cors";
import { config } from "./config/env";
import { requestLogger } from "./middleware/logger.middleware";
import notificationsRouter from "./routes/notifications.route";
import { Log, setAuthToken } from "@logging/index";
import { getValidToken } from "./auth/authService";
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(requestLogger);
app.use("/api/notifications", notificationsRouter);
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});
async function bootstrap() {
  try {
    const token = await getValidToken();
    setAuthToken(token);
    Log("backend", "info", "service", "Backend service started");
    app.listen(config.port, () => {
      console.log("[Server] Running on http://localhost:" + config.port);
    });
  } catch (error) {
    console.error("[Server] Failed to start:", error);
    process.exit(1);
  }
}
bootstrap();

