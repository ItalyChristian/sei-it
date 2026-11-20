import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { style } from "@vanilla-extract/css";

export const row = style({
  display: "flex",
  gap: "12px",
  alignItems: "flex-start",
  maxWidth: "85%",
});

export const rowOwn = style({
  marginLeft: "auto",
  flexDirection: "row-reverse",
});

export const rowInternal = style({
  selectors: {
    "&::before": {
      content: "none",
    },
  },
});

export const avatar = style({
  width: "36px",
  height: "36px",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: colors.status.info.text,
  fontWeight: 600,
  fontSize: "0.85rem",
  background: colors.status.info.bg,
  borderRadius: "50%",
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  minWidth: 0,
});

export const meta = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "12px",
  color: colors.textMuted,
});

export const author = style({
  fontWeight: 600,
  color: colors.textDark,
});

export const time = style({
  fontSize: "11px",
  color: colors.textMuted,
});

export const internalBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  padding: "1px 6px",
  borderRadius: radii.full,
  background: colors.status.warning.bg,
  color: colors.status.warning.text,
  fontSize: "10px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.02em",
});

export const bubble = style({
  padding: "12px 16px",
  borderRadius: radii.lg,
  background: "white",
  border: `1px solid ${colors.border}`,
  fontSize: "14px",
  lineHeight: 1.5,
  color: colors.textDark,
  selectors: {
    [`${rowOwn} &`]: {
      background: colors.primaryLight,
      borderColor: colors.primaryBorder,
    },
    [`${rowInternal} &`]: {
      background: "#FFFBEB",
      borderColor: colors.status.warning.border,
      borderStyle: "dashed",
    },
  },
});

export const text = style({
  margin: 0,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
});
