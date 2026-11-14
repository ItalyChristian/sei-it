import { createGlobalTheme } from "@vanilla-extract/css";

export const colors = createGlobalTheme(":root", {
  primary: "#2563EB",
  primaryHover: "#1D4ED8",
  offWhite: "#F8FAFC",

  textDark: "#0F172A",
  textMuted: "#64748B",

  borderColor: "#E2E8F0",

  accentYellow: "#FEF08A",
  successGreen: "#10B981",
  warningOrange: "#F59E0B",
  dangerRed: "#EF4444",

  shadowSm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  shadowMd: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
});

export type Colors = typeof colors;
