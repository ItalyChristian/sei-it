import { style } from "@vanilla-extract/css";
import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";

export const container = style({
  maxWidth: "760px",
  margin: "0 auto",
});

export const backLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "20px",
  color: colors.textMuted,
  fontSize: "13px",
  fontWeight: 600,
  textDecoration: "none",
  ":hover": {
    color: colors.primary,
  },
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  padding: "28px",
  border: `1px solid ${colors.border}`,
  borderRadius: radii.lg,
  background: "white",
  boxShadow: colors.shadowSm,
});

export const intro = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const heading = style({
  margin: 0,
  color: colors.textDark,
  fontSize: "20px",
  fontWeight: 700,
});

export const description = style({
  margin: 0,
  color: colors.textMuted,
  fontSize: "14px",
  lineHeight: 1.6,
});

export const fields = style({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const counter = style({
  alignSelf: "flex-end",
  color: colors.textMuted,
  fontSize: "12px",
});

export const error = style({
  margin: 0,
  color: colors.dangerRed,
  fontSize: "13px",
});

export const actions = style({
  display: "flex",
  justifyContent: "flex-end",
});

export const submitButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
});
