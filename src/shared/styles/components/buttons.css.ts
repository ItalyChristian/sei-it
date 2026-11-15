import { style } from "@vanilla-extract/css";
import { colors } from "../colors.css";

export const btnPrimary = style({
  padding: "8px 1rem",

  color: "white",
  fontWeight: 500,
  fontSize: "0.8rem",
  textDecoration: "none",
  transition: `${colors.offWhite} 0.2s`,

  borderRadius: "8px",
  backgroundColor: colors.primary,
  cursor: "pointer",

  ":hover": {
    backgroundColor: colors.primaryHover,
  },
});
