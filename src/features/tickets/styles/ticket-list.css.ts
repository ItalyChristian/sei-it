import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { keyframes, style } from "@vanilla-extract/css";

const typingPulse = keyframes({
  "0%, 20%": { opacity: 0.25 },
  "50%": { opacity: 1 },
  "80%, 100%": { opacity: 0.25 },
});

export const sidebar = style({
  width: "400px",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  background: "white",
  borderRight: `1px solid ${colors.border}`,
  height: "100%",
});

export const header = style({
  padding: "20px 24px",
  borderBottom: `1px solid ${colors.border}`,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const heading = style({
  margin: 0,
  fontSize: "16px",
  fontWeight: 700,
  color: colors.textDark,
});

export const search = style({
  width: "100%",
  padding: "9px 34px",
  border: `1px solid ${colors.border}`,
  borderRadius: radii.md,
  color: colors.textDark,
  fontSize: "13px",
  outline: "none",
  ":focus": {
    borderColor: colors.primary,
  },
});

export const searchWrap = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
});

export const searchIcon = style({
  position: "absolute",
  left: "11px",
  color: colors.textMuted,
  pointerEvents: "none",
});

export const clearSearch = style({
  position: "absolute",
  right: "7px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  padding: 0,
  border: "none",
  borderRadius: radii.full,
  background: "transparent",
  color: colors.textMuted,
  cursor: "pointer",
  ":hover": {
    background: colors.offWhite,
    color: colors.textDark,
  },
});

export const pills = style({
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
});

export const pill = style({
  padding: "4px 10px",
  borderRadius: radii.full,
  border: `1px solid ${colors.border}`,
  background: "white",
  color: colors.textMuted,
  fontSize: "11px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.15s",
  whiteSpace: "nowrap",
  ":hover": {
    background: colors.offWhite,
  },
});

export const pillActive = style({
  background: colors.primary,
  borderColor: colors.primary,
  color: "white",
});

export const pillDanger = style({
  selectors: {
    [`${pillActive}&`]: {
      background: colors.dangerRed,
      borderColor: colors.dangerRed,
    },
  },
});

export const list = style({
  flex: 1,
  overflowY: "auto",
});

export const item = style({
  width: "100%",
  textAlign: "left",
  padding: "16px 24px",
  borderBottom: `1px solid ${colors.border}`,
  background: "transparent",
  border: "none",
  borderLeft: "4px solid transparent",
  cursor: "pointer",
  transition: "background 0.15s",
  fontFamily: "inherit",
  ":hover": {
    background: colors.offWhite,
  },
});

export const itemActive = style({
  background: colors.primaryLight,
  borderLeftColor: colors.primary,
});

export const itemMeta = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
  marginBottom: "6px",
});

export const itemRight = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const itemId = style({
  fontSize: "11px",
  fontWeight: 600,
  color: colors.textMuted,
  fontFamily: "monospace",
});

export const itemTitle = style({
  fontSize: "13px",
  fontWeight: 600,
  color: colors.textDark,
  marginBottom: "4px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const itemSnippet = style({
  fontSize: "12px",
  color: colors.textMuted,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const typingSnippet = style({
  color: colors.primary,
  fontWeight: 600,
  selectors: {
    "&::after": {
      content: '"..."',
      display: "inline-block",
      width: "18px",
      animation: `${typingPulse} 1.2s ease-in-out infinite`,
    },
  },
});

export const loading = style({
  padding: "24px",
  color: colors.textMuted,
  fontSize: "13px",
});

export const empty = style({
  color: colors.textMuted,
  fontSize: "13px",
  fontStyle: "italic",
  textAlign: "center",
});
