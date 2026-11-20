import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "24px 32px",
  overflowY: "auto",
  flex: 1,
});
export const group = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const dateDivider = style({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  color: colors.textMuted,
  fontSize: "12px",
  fontWeight: 500,
  margin: "8px 0",
  selectors: {
    "&::before, &::after": {
      content: '""',
      flex: 1,
      height: "1px",
      background: colors.border,
    },
  },
});
