import { colors } from "@/shared/styles/colors.css";
import { keyframes, style } from "@vanilla-extract/css";

const pulse = keyframes({
  "0%": { boxShadow: `0 0 0 0 ${colors.dangerRed}66` },
  "70%": { boxShadow: `0 0 0 6px ${colors.dangerRed}00` },
  "100%": { boxShadow: `0 0 0 0 ${colors.dangerRed}00` },
});

export const dot = style({
  display: "inline-block",
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: colors.dangerRed,
  animation: `${pulse} 1.5s infinite`,
  flexShrink: 0,
});
