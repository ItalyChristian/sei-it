import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const panel = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  height: "100vh",
  overflow: "hidden",
});

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
  textDecoration: "none",
  textAlign: "left",
  fontFamily: "inherit",
  cursor: "pointer",
  ":hover": {
    color: colors.primary,
  },
});
