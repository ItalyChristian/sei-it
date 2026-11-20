import { colors } from "@/shared/styles/colors.css";
import { keyframes, style, styleVariants } from "@vanilla-extract/css";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const spinner = style({
  display: "inline-block",
  border: "2px solid currentColor",
  borderRightColor: "transparent",
  borderRadius: "50%",
  animation: `${spin} 0.75s linear infinite`,
});

export const sizes = styleVariants({
  sm: { width: "1rem", height: "1rem", borderWidth: "2px" },
  md: { width: "2rem", height: "2rem", borderWidth: "3px" },
  lg: { width: "3rem", height: "3rem", borderWidth: "4px" },
});

export const centeredWrapper = style({
  width: "100%",
  height: "100%",
  minHeight: "200px",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",

  color: colors.primary,
});

export const label = style({
  color: colors.textMuted,
  fontSize: "0.875rem",
  fontWeight: 500,
});
