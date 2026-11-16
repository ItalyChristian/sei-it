import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "380px",
  height: "100vh",
  display: "flex",
  flexDirection: "column",

  backgroundColor: "white",
  borderRight: `1px solid  ${colors.border} `,
});

export const header = style({
  padding: "1.5rem",
  borderBottom: `1px solid  ${colors.border} `,
});

export const h2 = style({
  color: colors.textDark,
  fontSize: "1.12rem",
  fontWeight: 600,
  marginBottom: "1rem",
});
