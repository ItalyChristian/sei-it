import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const form = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
});

export const label = style({
  color: colors.textMuted,
  fontSize: "12px",
  fontWeight: 600,
});

export const error = style({
  color: colors.dangerRed,
  fontSize: "12px",
});
