"use client";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Notifications as NIcon, Star as SIcon } from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const path = usePathname();
  return (
    <AppBar position="sticky" elevation={0} sx={{
      backgroundColor: "rgba(255,255,255,0.9)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid #e2e8f0",
    }}>
      <Toolbar sx={{ maxWidth: 900, width: "100%", mx: "auto", px: { xs: 2, md: 3 } }}>
        <Box display="flex" alignItems="center" gap={1} sx={{ flexGrow: 1 }}>
          <Box sx={{
            width: 34, height: 34, borderRadius: "10px",
            background: "linear-gradient(135deg, #2563eb, #3b82f6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <NIcon sx={{ color: "white", fontSize: 18 }} />
          </Box>
          <Typography variant="h6" sx={{ color: "#0f172a", fontSize: "1rem" }}>
            Campus<span style={{ color: "#2563eb" }}>Notify</span>
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            component={Link} href="/"
            variant={path === "/" ? "contained" : "text"}
            startIcon={<NIcon />}
            size="small"
            sx={path === "/" ? {
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              boxShadow: "0 2px 8px rgba(37,99,235,0.3)",
            } : { color: "#64748b" }}
          >
            All
          </Button>
          <Button
            component={Link} href="/priority"
            variant={path === "/priority" ? "contained" : "text"}
            startIcon={<SIcon />}
            size="small"
            sx={path === "/priority" ? {
              background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
              boxShadow: "0 2px 8px rgba(245,158,11,0.3)",
              color: "white",
            } : { color: "#64748b" }}
          >
            Priority
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}