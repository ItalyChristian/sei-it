import { style } from "@vanilla-extract/css";
import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const label = style({
  color: colors.textDark,
  fontSize: "14px",
  fontWeight: 600,
});

const controlBase = {
  width: "100%",
  border: `1px solid ${colors.border}`,
  borderRadius: radii.md,
  background: "white",
  color: colors.textDark,
  fontFamily: "inherit",
  fontSize: "14px",
  outline: "none",
  ":focus": {
    borderColor: colors.primary,
    boxShadow: `0 0 0 2px ${colors.primaryBorder}`,
  },
  "::placeholder": {
    color: colors.textMuted,
  },
};

export const input = style({
  ...controlBase,
  height: "48px",
  padding: "0 14px",
});

export const textarea = style({
  ...controlBase,
  minHeight: "140px",
  padding: "12px 14px",
  resize: "vertical",
});

export const select = style({
  ...controlBase,
  height: "48px",
  padding: "0 14px",
});
