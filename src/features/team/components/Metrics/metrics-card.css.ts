import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const card = style({
  minWidth: 0,
});

export const header = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "12px",
});

export const identity = style({
  display: "flex",
  flex: "1 1 180px",
  alignItems: "center",
  gap: "12px",
  minWidth: 0,
});

export const avatar = style({
  width: "40px",
  height: "40px",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: colors.status.info.text,
  fontWeight: 600,
  fontSize: "1rem",
  background: colors.status.info.bg,
  borderRadius: "50%",
});

export const name = style({
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontWeight: 600,
  fontSize: "15px",
});

export const badge = style({
  flexShrink: 0,
  maxWidth: "100%",
  whiteSpace: "normal",
  overflowWrap: "anywhere",
  textAlign: "center",
});

export const status = styleVariants({
  active: {
    color: colors.successGreen,
    fontSize: "12px",
    fontWeight: 500,
  },
  idle: {
    color: colors.textMuted,
    fontSize: "12px",
    fontWeight: 500,
  },
});

export const loadBar = style({
  height: "8px",
  margin: "16px 0",
  background: colors.offWhite,
  borderRadius: radii.xs,
  overflow: "hidden",
});

export const loadFill = style({
  height: "100%",
  borderRadius: radii.xs,
});

export const loadFillTone = styleVariants({
  success: { background: colors.successGreen },
  warning: { background: colors.warningOrange },
  danger: { background: colors.dangerRed },
});

export const stats = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: "8px",
  color: colors.textMuted,
  fontSize: "12px",
  marginBottom: 0,
});
