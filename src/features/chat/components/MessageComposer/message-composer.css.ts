import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { style } from "@vanilla-extract/css";

export const composer = style({
  borderTop: `1px solid ${colors.border}`,
  background: "white",
  padding: "16px 32px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const toolbar = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const toggle = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "4px 10px",
  borderRadius: radii.full,
  border: `1px solid ${colors.border}`,
  background: "white",
  color: colors.textMuted,
  fontSize: "12px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.15s",
  ":hover": {
    background: colors.offWhite,
  },
});

export const toggleActive = style({
  background: colors.status.warning.bg,
  borderColor: colors.status.warning.border,
  color: colors.status.warning.text,
});

export const inputRow = style({
  display: "flex",
  gap: "8px",
  alignItems: "flex-end",
});

export const inputRowInternal = style({
  borderLeft: `3px solid ${colors.status.warning.text}`,
  paddingLeft: "12px",
  marginLeft: "-12px",
});

export const textarea = style({
  flex: 1,
  resize: "none",
  padding: "10px 14px",
  border: `1px solid ${colors.border}`,
  borderRadius: radii.md,
  fontSize: "14px",
  fontFamily: "inherit",
  color: colors.textDark,
  outline: "none",
  transition: "border-color 0.15s",
  ":focus": {
    borderColor: colors.primary,
  },
});

export const sendButton = style({
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: radii.md,
  border: "none",
  background: colors.primary,
  color: "white",
  cursor: "pointer",
  transition: "background 0.15s",
  flexShrink: 0,
  ":hover": {
    background: colors.primaryHover,
  },
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const error = style({
  margin: 0,
  fontSize: "12px",
  color: colors.dangerRed,
});
