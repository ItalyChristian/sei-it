import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const kpiGrid = style({
  display: "grid",
  gridTemplateColumns: " repeat(4, 1fr)",
  gap: "24px",
});

export const title = style({
  fontSize: "13px",
  fontWeight: 500,
  color: colors.textMuted,
  marginBottom: "8px",
});

export const value = style({
  fontSize: "28px",
  fontWeight: 700,
  color: colors.textDark,
});
