import { colors } from "@/shared/styles/colors.css";
import { style, styleVariants } from "@vanilla-extract/css";

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

export const value = styleVariants({
  default: { color: colors.textDark },
  success: { color: colors.successGreen },
  danger: { color: colors.dangerRed },
  warning: { color: colors.warningOrange },
  info: { color: colors.primary },
});

export const valueBase = style({
  fontSize: "28px",
  fontWeight: 700,
  lineHeight: 1.2,
});
