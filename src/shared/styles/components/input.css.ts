import { style } from "@vanilla-extract/css";
import { colors } from "../colors.css";
import { radii } from "../sizes.css";

export const searchInput = style({
  selectors: {
    "&.p-inputtext": {
      width: "min(100%, 400px)",
      height: "47px",
      borderColor: colors.border,
      borderRadius: radii.md,
      backgroundColor: "white",
      color: colors.textDark,
      fontSize: "14px",
    },
  },
});
