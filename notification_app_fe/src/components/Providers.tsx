"use client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563eb", light: "#3b82f6", dark: "#1d4ed8" },
    warning: { main: "#f59e0b", light: "#fbbf24", dark: "#d97706" },
    success: { main: "#10b981", light: "#34d399", dark: "#059669" },
    error: { main: "#ef4444" },
    background: { default: "#f8fafc", paper: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#64748b" },
  },
  typography: {
    fontFamily: '"DM Sans", "Segoe UI", sans-serif',
    h4: { fontWeight: 800, letterSpacing: "-0.02em" },
    h6: { fontWeight: 700, letterSpacing: "-0.01em" },
    body1: { fontSize: "0.95rem", lineHeight: 1.6 },
    caption: { fontSize: "0.75rem" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: "1px solid #e2e8f0",
          transition: "all 0.2s ease",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.85rem",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 600, fontSize: "0.75rem" },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { borderBottom: "1px solid #e2e8f0" },
      },
    },
  },
});
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}