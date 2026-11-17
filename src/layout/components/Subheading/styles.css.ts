import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const heading = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
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
