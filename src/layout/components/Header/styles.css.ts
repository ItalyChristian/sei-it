import { mediaQueries } from "@/shared/styles/breakpoints";
import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const wrapper = style({
  backgroundColor: "white",
  borderBottom: `1px solid ${colors.border}`,

  position: "relative",
  zIndex: 10,
});

export const container = style({
  width: "100%",
  height: "60px",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "0 auto",
  paddingInline: "2rem",

  "@media": {
    [mediaQueries.smartphone]: {
      paddingInline: "1rem",
    },
  },
});

export const logo = style({
  color: colors.textDark,
  fontSize: "20px",
  fontWeight: "bold",
  textDecoration: "none",
  letterSpacing: "-1.2px",
});

export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: "24px",

  fontSize: "13px",

  "@media": {
    [mediaQueries.smartphone]: {
      display: "none",
    },
  },
});

export const linkLogin = style({
  color: colors.textDark,
  textDecoration: "none",
  transition: "color 0.2s",
  ":hover": {
    color: colors.textDark,
  },
});

export const btnPrimary = style({
  padding: "8px 16px",

  borderRadius: "8px",
  backgroundColor: colors.primary,
  color: "white",
  fontWeight: "600",
  textDecoration: "none",
  transition: "background-color 0.2s",
  ":hover": {
    backgroundColor: colors.primaryHover,
  },
});

export const mobileMenuButton = style({
  width: "40px",
  height: "40px",

  display: "none",
  alignItems: "center",
  justifyContent: "center",

  color: colors.textDark,
  background: "transparent",
  border: "none",
  cursor: "pointer",

  position: "relative",
  zIndex: 30,

  "@media": {
    [mediaQueries.smartphone]: {
      display: "flex",
    },
  },
});
