"use client";
import React, { useState } from "react";
import { Card, CardContent, Typography, Chip, Box, Tooltip } from "@mui/material";
import {
  Event as EventIcon,
  EmojiEvents as ResultIcon,
  Work as PlacementIcon,
  FiberManualRecord as DotIcon,
} from "@mui/icons-material";
import { Notification } from "../api/notifications";
import { isViewed, markAsViewed } from "../state/notificationStore";
const TYPE_CFG = {
  Event: {
    color: "primary" as const,
    icon: <EventIcon sx={{ fontSize: 14 }} />,
    bg: "linear-gradient(135deg, #eff6ff, #dbeafe)",
    border: "#bfdbfe",
    dot: "#2563eb",
    label: "Event",
  },
  Result: {
    color: "success" as const,
    icon: <ResultIcon sx={{ fontSize: 14 }} />,
    bg: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
    border: "#bbf7d0",
    dot: "#10b981",
    label: "Result",
  },
  Placement: {
    color: "warning" as const,
    icon: <PlacementIcon sx={{ fontSize: 14 }} />,
    bg: "linear-gradient(135deg, #fffbeb, #fef3c7)",
    border: "#fde68a",
    dot: "#f59e0b",
    label: "Placement",
  },
};
export default function NotificationCard({ notification, onView, rank }: {
  notification: Notification;
  onView?: () => void;
  rank?: number;
}) {
  const [viewed, setViewed] = useState(isViewed(notification.ID));
  const cfg = TYPE_CFG[notification.Type] ?? TYPE_CFG.Event;
  const handleClick = () => {
    if (!viewed) { markAsViewed(notification.ID); setViewed(true); onView?.(); }
  };
  const timeAgo = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor(diff / 60000);
    if (h > 24) return `${Math.floor(h / 24)}d ago`;
    if (h > 0) return `${h}h ago`;
    return `${m}m ago`;
  };
  return (
    <Card onClick={handleClick} elevation={0} sx={{
      mb: 1.5,
      cursor: "pointer",
      background: viewed ? "#fafafa" : cfg.bg,
      border: `1px solid ${viewed ? "#e2e8f0" : cfg.border}`,
      borderRadius: "14px",
      opacity: viewed ? 0.6 : 1,
      transition: "all 0.2s ease",
      "&:hover": {
        transform: "translateY(-1px)",
        boxShadow: viewed ? "none" : "0 8px 24px rgba(0,0,0,0.08)",
        opacity: 1,
        borderColor: cfg.dot,
      },
    }}>
      <CardContent sx={{ py: 2, px: 2.5, "&:last-child": { pb: 2 } }}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={1}>
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            {rank && (
              <Typography sx={{
                fontSize: "0.75rem", fontWeight: 800, color: "#94a3b8",
                minWidth: 28, fontVariantNumeric: "tabular-nums",
              }}>
                #{rank}
              </Typography>
            )}
            <Chip
              icon={cfg.icon}
              label={cfg.label}
              color={cfg.color}
              size="small"
              variant={viewed ? "outlined" : "filled"}
              sx={{ height: 24, "& .MuiChip-label": { px: 1 } }}
            />
            {!viewed && (
              <Tooltip title="Unread">
                <DotIcon sx={{ fontSize: 10, color: "#ef4444", mt: 0.2 }} />
              </Tooltip>
            )}
            {notification.score !== undefined && (
              <Chip
                label={`★ ${notification.score.toFixed(3)}`}
                size="small"
                variant="outlined"
                sx={{
                  height: 22, fontSize: "0.7rem", fontWeight: 700,
                  color: "#f59e0b", borderColor: "#fde68a",
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            )}
          </Box>
          <Box display="flex" alignItems="center" gap={0.5} sx={{ flexShrink: 0 }}>
            <Typography variant="caption" sx={{ color: "#94a3b8", fontWeight: 500, fontSize: "0.72rem" }}>
              {timeAgo(notification.Timestamp)}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{
          mt: 1.2, mb: 0.5,
          fontWeight: viewed ? 400 : 700,
          fontSize: "0.95rem",
          color: viewed ? "#94a3b8" : "#0f172a",
          textTransform: "capitalize",
        }}>
          {notification.Message}
        </Typography>
        <Typography sx={{ fontSize: "0.7rem", color: "#cbd5e1", fontFamily: "monospace" }}>
          {notification.ID}
        </Typography>
      </CardContent>
    </Card>
  );
}