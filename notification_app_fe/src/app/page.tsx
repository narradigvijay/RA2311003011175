"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Container, Typography, Box, CircularProgress, Alert,
  Select, MenuItem, FormControl, InputLabel, Button,
  Chip, Divider, Pagination, Paper
} from "@mui/material";
import { Refresh as RefreshIcon, NotificationsNone as EmptyIcon } from "@mui/icons-material";
import { fetchAllNotifications, Notification } from "../api/notifications";
import NotificationCard from "../components/NotificationCard";
import { markAllAsViewed, isViewed } from "../state/notificationStore";
const TYPES = ["All", "Event", "Result", "Placement"];
const TYPE_COLORS: any = {
  All: "#64748b", Event: "#2563eb", Result: "#10b981", Placement: "#f59e0b"
};
export default function HomePage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [tick, setTick] = useState(0);
  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const data = await fetchAllNotifications({
        ...(filter !== "All" && { notification_type: filter }),
        limit: 10, page,
      });
      setNotifications(data);
    } catch {
      setError("Cannot connect to backend. Make sure it is running on port 5000.");
    } finally {
      setLoading(false);
    }
  }, [filter, page]);
  useEffect(() => { load(); }, [load]);
  const unread = notifications.filter(n => !isViewed(n.ID)).length;
  return (
    <Box sx={{ minHeight: "100vh", background: "#f8fafc" }}>
      {/* Hero header */}
      <Box sx={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
        pt: 5, pb: 8, px: 2,
      }}>
        <Container maxWidth="md">
          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", mb: 1 }}>
            CAMPUS NOTIFICATIONS
          </Typography>
          <Typography variant="h4" sx={{ color: "white", mb: 1 }}>
            All Notifications
          </Typography>
          <Box display="flex" alignItems="center" gap={1.5} flexWrap="wrap">
            {unread > 0 && (
              <Chip
                label={`${unread} unread`}
                size="small"
                sx={{ backgroundColor: "#ef4444", color: "white", fontWeight: 700 }}
              />
            )}
            <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
              {notifications.length} notifications loaded
            </Typography>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="md" sx={{ mt: -4 }}>
        {/* Controls card */}
        <Paper elevation={0} sx={{
          p: 2, mb: 3, borderRadius: "16px",
          border: "1px solid #e2e8f0",
          display: "flex", alignItems: "center",
          flexWrap: "wrap", gap: 2,
          justifyContent: "space-between",
        }}>
          <Box display="flex" gap={1} flexWrap="wrap">
            {TYPES.map(t => (
              <Chip
                key={t}
                label={t}
                onClick={() => { setFilter(t); setPage(1); }}
                variant={filter === t ? "filled" : "outlined"}
                size="small"
                sx={{
                  cursor: "pointer",
                  fontWeight: 600,
                  backgroundColor: filter === t ? TYPE_COLORS[t] : "transparent",
                  color: filter === t ? "white" : TYPE_COLORS[t],
                  borderColor: TYPE_COLORS[t],
                  "&:hover": { opacity: 0.85 },
                }}
              />
            ))}
          </Box>
          <Box display="flex" gap={1}>
            <Button
              size="small" variant="outlined"
              disabled={unread === 0}
              onClick={() => { markAllAsViewed(notifications.map(n => n.ID)); setTick(t => t + 1); }}
              sx={{ borderColor: "#e2e8f0", color: "#64748b" }}
            >
              Mark all read
            </Button>
            <Button
              size="small" variant="contained"
              startIcon={<RefreshIcon />}
              onClick={load}
              sx={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)", boxShadow: "none" }}
            >
              Refresh
            </Button>
          </Box>
        </Paper>
        {/* Notifications */}
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" py={8} gap={2}>
            <CircularProgress size={24} />
            <Typography color="text.secondary">Loading notifications...</Typography>
          </Box>
        )}
        {error && <Alert severity="error" sx={{ borderRadius: "12px", mb: 2 }}>{error}</Alert>}
        {!loading && !error && notifications.length === 0 && (
          <Box textAlign="center" py={8}>
            <EmptyIcon sx={{ fontSize: 48, color: "#cbd5e1", mb: 2 }} />
            <Typography color="text.secondary">No notifications found.</Typography>
          </Box>
        )}
        {!loading && !error && notifications.map(n => (
          <NotificationCard key={n.ID + tick} notification={n} onView={() => setTick(t => t + 1)} />
        ))}
        {!loading && notifications.length > 0 && (
          <Box display="flex" justifyContent="center" mt={3} pb={6}>
            <Pagination
              count={10} page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
              shape="rounded"
              sx={{ "& .MuiPaginationItem-root": { borderRadius: "8px" } }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}