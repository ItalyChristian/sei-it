import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  maxWidth: "25rem",
  height: "calc(100vh - 60px)",
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

export const queueLink = style({
  margin: "1rem",
  padding: "0.75rem 1rem",
  color: colors.primary,
  fontSize: "0.875rem",
  fontWeight: 600,
  textDecoration: "none",
});
