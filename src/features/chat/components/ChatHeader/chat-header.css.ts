import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { style } from "@vanilla-extract/css";

export const header = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "24px 32px",
  background: "white",
  borderBottom: `1px solid ${colors.border}`,
});

export const titleRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "24px",
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  minWidth: 0,
});

export const badges = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
});

export const ticketId = style({
  fontSize: "12px",
  fontWeight: 600,
  color: colors.textMuted,
  fontFamily: "monospace",
});

export const title = style({
  color: colors.textDark,
  fontSize: "1.5rem",
  fontWeight: 700,
  letterSpacing: "-0.5px",
  margin: 0,
});

export const actions = style({
  display: "flex",
  gap: "12px",
  flexShrink: 0,
});

export const assumeButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 16px",
  borderRadius: radii.md,
  border: "none",
  background: colors.primary,
  color: "white",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "background 0.15s",
  ":hover": {
    background: colors.primaryHover,
  },
  ":disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
});

export const info = style({
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
  color: colors.textMuted,
  fontSize: "12px",
});

export const infoItem = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
});
