import { createGlobalTheme } from "@vanilla-extract/css";

export const colors = createGlobalTheme(":root", {
  primary: "#2563EB",
  primaryHover: "#1D4ED8",
  primaryLight: "#EFF6FF",
  primaryBorder: "#BFDBFE",

  offWhite: "#F8FAFC",

  textDark: "#0F172A",
  textMuted: "#64748B",

  border: "#E2E8F0",
  accentYellow: "#FEF08A",
  successGreen: "#10B981",
  warningOrange: "#F59E0B",
  dangerRed: "#EF4444",

  shadowSm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  shadowMd: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",

  status: {
    neutral: {
      bg: "#F1F5F9", // slate-100
      text: "#475569", // slate-600
      border: "#E2E8F0", // slate-200
    },

    info: {
      bg: "#DBEAFE", // blue-100
      text: "#1E40AF", // blue-800
      border: "#BFDBFE", // blue-200
    },

    success: {
      bg: "#D1FAE5", // emerald-100
      text: "#065F46", // emerald-800
      border: "#A7F3D0", // emerald-200
    },

    warning: {
      bg: "#FEF3C7", // amber-100
      text: "#92400E", // amber-800
      border: "#FDE68A", // amber-200
    },

    danger: {
      bg: "#FEE2E2", // red-100
      text: "#991B1B", // red-800
      border: "#FECACA", // red-200
    },
  },
});

export type Colors = typeof colors;
