import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  padding: "24px",
  color: colors.textMuted,
  textAlign: "center",
});

export const icon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "0.5rem",
});

export const title = style({
  margin: 0,
  color: colors.textDark,
  fontSize: "1rem",
  fontWeight: 600,
});

export const description = style({
  margin: 0,
  color: colors.textMuted,
  fontSize: "0.875rem",
  lineHeight: 1.5,
});

export const action = style({
  marginTop: "0.5rem",
});
