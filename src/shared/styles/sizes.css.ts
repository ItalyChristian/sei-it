import { createGlobalTheme } from "@vanilla-extract/css";

export const radii = createGlobalTheme(":root", {
  none: "0",
  sm: "6px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  "3xl": "24px",
  full: "9999px",
});

export type Radii = typeof radii;
