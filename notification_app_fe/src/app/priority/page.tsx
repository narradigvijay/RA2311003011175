"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Container, Typography, Box, CircularProgress, Alert,
  Slider, Chip, Divider, Button, Paper
} from "@mui/material";
import { Star as StarIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import { fetchPriorityNotifications, Notification } from "../../api/notifications";
import NotificationCard from "../../components/NotificationCard";
export default function PriorityPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topN, setTopN] = useState(10);
  const [tick, setTick] = useState(0);
  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try { setNotifications(await fetchPriorityNotifications(topN)); }
    catch { setError("Failed to load priority notifications."); }
    finally { setLoading(false); }
  }, [topN]);
  useEffect(() => { load(); }, [load]);
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <StarIcon color="warning" />
        <Typography variant="h4" fontWeight={700}>Priority Inbox</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Top notifications ranked by type weight (Placement &gt; Result &gt; Event) × recency.
      </Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Chip label="Placement — Weight 3" color="warning" size="small" />
        <Chip label="Result — Weight 2" color="success" size="small" />
        <Chip label="Event — Weight 1" color="primary" size="small" />
        <Typography variant="caption" color="text.secondary" alignSelf="center">
          Score = weight × (1 / (1 + ageInHours))
        </Typography>
      </Paper>
      <Box mb={3}>
        <Typography variant="body2" gutterBottom>Show Top <strong>{topN}</strong> notifications</Typography>
        <Slider value={topN} min={5} max={20} step={5}
          marks={[{value:5,label:"5"},{value:10,label:"10"},{value:15,label:"15"},{value:20,label:"20"}]}
          onChange={(_, v) => setTopN(v as number)} sx={{ maxWidth: 400 }} color="warning" />
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button startIcon={<RefreshIcon />} size="small" variant="outlined" onClick={load}>Refresh</Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {loading && <Box display="flex" justifyContent="center" py={6}><CircularProgress color="warning" /></Box>}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && notifications.length === 0 && <Alert severity="info">No notifications found.</Alert>}
      {!loading && !error && notifications.map((n, i) => (
        <Box key={n.ID + tick} display="flex" alignItems="flex-start" gap={1}>
          <Typography variant="h6" fontWeight={700} color="text.disabled" sx={{ pt: 1.5, minWidth: 36 }}>
            #{i + 1}
          </Typography>
          <Box flex={1}>
            <NotificationCard notification={n} onView={() => setTick(t => t + 1)} />
          </Box>
        </Box>
      ))}
    </Container>
  );
}