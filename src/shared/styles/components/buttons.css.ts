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
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

// export const submit = style({
//   border: "none",
//   borderRadius: radii.md,
//   padding: "8px 12px",
//   color: "white",
//   background: colors.primary,
//   fontSize: "12px",
//   fontWeight: 600,
//   cursor: "pointer",

// });
