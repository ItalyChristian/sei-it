import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const backLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "12px 32px",
  border: 0,
  color: colors.textMuted,
  background: "white",
  borderBottom: `1px solid ${colors.border}`,
  fontSize: "13px",
  fontWeight: 500,
  textAlign: "left",
  fontFamily: "inherit",
  textDecoration: "none",
  cursor: "pointer",
  ":hover": {
    color: colors.primary,
  },
});
