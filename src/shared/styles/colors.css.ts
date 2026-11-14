import { createGlobalTheme } from "@vanilla-extract/css";

export const colors = createGlobalTheme(":root", {
  primary: "#3458f5",
  primaryHover: "#2448e6",

  secondary: "#686a73",
  muted: "#696b75",

  accentPeach: "#ffc99f",
  accentYellow: "#fff2c3",
  accentLavender: "#e1e7ff",
  imagePlaceholder: "#9caba3",
  badgeBackground: "#e4eaff",

  background: "#faf9f5",
  foreground: "#191d2d",

  border: "#e4e6ed",
  borderSoft: "#dfe1e8",
  surface: "#ffffff",
  surfaceHover: "#f5f5f3",
});

export type Colors = typeof colors;
