import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const wrapper = style({
  display: "flex",
  alignItems: "center",
  color: colors.primary,
});

export const centered = style({
  width: "100%",
  height: "100%",
  minHeight: "200px",
  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  gap: "1rem",
});

export const inline = style({
  display: "inline-flex",
  gap: "0.5rem",
});

export const label = style({
  color: colors.textMuted,
  fontSize: "0.875rem",
  fontWeight: 500,
});
