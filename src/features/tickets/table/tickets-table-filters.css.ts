import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { style } from "@vanilla-extract/css";

export const toolbar = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",

  gap: "1rem",
});

export const searchInput = style({
  selectors: {
    "&.p-inputtext": {
      width: "min(100%, 400px)",
      height: "40px",
      borderColor: colors.border,
      borderRadius: radii.md,
      backgroundColor: "white",
      color: colors.textDark,
      fontSize: "14px",
    },
  },
});
