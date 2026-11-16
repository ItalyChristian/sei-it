import { mediaQueries } from "@/shared/styles/breakpoints";
import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { globalStyle, style } from "@vanilla-extract/css";

export const toolbar = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "12px",
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

export const filterDropdown = style({
  selectors: {
    "&.p-dropdown": {
      width: "240px",
      height: "40px",
      borderColor: colors.border,
      borderRadius: radii.md,
      backgroundColor: "white",
    },
  },

  "@media": {
    [mediaQueries.smartphone]: {
      width: "100%",
      selectors: {
        "&.p-dropdown": {
          width: "100%",
        },
      },
    },
  },
});

globalStyle(`${filterDropdown} .p-dropdown-label`, {
  display: "flex",
  alignItems: "center",
  color: colors.textDark,
  fontSize: "13px",
});
