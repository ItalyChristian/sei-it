import { mediaQueries } from "@/shared/styles/breakpoints";
import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { style } from "@vanilla-extract/css";

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",

  "@media": {
    [mediaQueries.smartphone]: {
      alignItems: "flex-start",
      flexDirection: "column",
    },
  },
});

export const actions = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  gap: "8px",
});

export const collapseButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 12px",
  color: colors.textDark,
  fontSize: "13px",
  fontWeight: 500,
  border: `1px solid ${colors.border}`,
  borderRadius: radii.md,
  background: "white",
  cursor: "pointer",
  ":hover": {
    background: colors.offWhite,
  },
});

export const title = style({
  margin: 0,

  color: colors.textDark,
  fontSize: "18px",
  fontWeight: 700,
});

export const description = style({
  margin: "4px 0 0",
  color: colors.textMuted,
  fontSize: "13px",
});

export const redistributeButton = style({
  padding: "8px 16px",

  color: colors.textDark,
  fontSize: "13px",
  fontWeight: 500,
  border: `1px solid ${colors.border}`,
  borderRadius: radii.md,
  background: "white",

  whiteSpace: "nowrap",
  cursor: "not-allowed",
  opacity: 0.6,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
  gap: "24px",
});

export const emptyState = style({
  margin: 0,
  padding: "24px",

  color: colors.textMuted,

  background: "white",
  border: `1px solid ${colors.border}`,
  borderRadius: radii.xl,
});
