import { mediaQueries } from "@/shared/styles/breakpoints";
import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const page = style({
  display: "flex",
  minHeight: "calc(100vh - 60px)",
  flexDirection: "column",
  gap: "20px",
  padding: "32px",
  backgroundColor: colors.offWhite,
  color: colors.textDark,
  boxSizing: "border-box",

  "@media": {
    [mediaQueries.smartphone]: {
      padding: "16px",
    },
  },
});

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
