import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { style } from "@vanilla-extract/css";

export const heading = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingInline: "2rem",
  paddingBlock: "1rem",
  gap: "24px",
});

export const headingContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const dateBox = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "2px",
  padding: "8px 12px",
  border: `1px solid ${colors.border}`,
  borderRadius: radii.md,
  backgroundColor: colors.offWhite,
  whiteSpace: "nowrap",
});

export const dateLabel = style({
  fontSize: "10px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: colors.textMuted,
});

export const dateValue = style({
  fontSize: "13px",
  fontWeight: 600,
  color: colors.textDark,
});

export const title = style({
  margin: 0,
  color: colors.textDark,
  fontSize: "18px",
  fontWeight: 700,
});

export const description = style({
  margin: 0,
  color: colors.textMuted,
  fontSize: "13px",
});
