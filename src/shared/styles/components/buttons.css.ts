import { style } from "@vanilla-extract/css";
import { colors } from "../colors.css";

export const btnPrimary = style({
  padding: "8px 16px",

  borderRadius: "8px",
  backgroundColor: colors.primary,
  color: "white",
  fontWeight: "600",
  textDecoration: "none",
  transition: "background-color 0.2s",

  cursor: "pointer",

  ":hover": {
    backgroundColor: colors.primaryHover,
  },
});
