import { mediaQueries } from "@/shared/styles/breakpoints";
import { style } from "@vanilla-extract/css";

const colors = {
  background: "#FFFFFF",
  border: "#E2E8F0",
  foreground: "#0F172A",
  secondary: "#64748B",
  primary: "#2563EB",
  primaryHover: "#1D4ED8",
  textWhite: "#FFFFFF",
};

export const headerWrapper = style({
  position: "relative",
  zIndex: 10,
  borderBottom: `1px solid ${colors.border}`,
  backgroundColor: colors.background,
});

export const headerContainer = style({
  margin: "0 auto",
  display: "flex",
  height: "60px",
  width: "100%",
  maxWidth: "1010px",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: "16px",
  paddingRight: "16px",
  "@media": {
    [mediaQueries.smartphone]: {
      paddingLeft: "0", // aqui na vdd foi usado min
      paddingRight: "0",
    },
  },
});

export const logo = style({
  fontSize: "20px",
  fontWeight: "bold",
  letterSpacing: "-1.2px",
  color: colors.foreground,
  textDecoration: "none",
});

export const actionsContainer = style({
  display: "none",
  alignItems: "center",
  gap: "24px",
  fontSize: "13px",
  "@media": {
    "(min-width: 768px)": {
      display: "flex",
    },
  },
});

export const linkLogin = style({
  color: colors.secondary,
  textDecoration: "none",
  transition: "color 0.2s",
  ":hover": {
    color: colors.foreground,
  },
});

export const btnPrimary = style({
  backgroundColor: colors.primary,
  color: colors.textWhite,
  padding: "8px 16px",
  borderRadius: "8px",
  fontWeight: "600",
  textDecoration: "none",
  transition: "background-color 0.2s",
  ":hover": {
    backgroundColor: colors.primaryHover,
  },
});

export const mobileMenuButton = style({
  position: "relative",
  zIndex: 30,
  display: "flex",
  height: "40px",
  width: "40px",
  alignItems: "center",
  justifyContent: "center",
  color: colors.foreground,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  "@media": {
    "(min-width: 768px)": {
      display: "none",
    },
  },
});
