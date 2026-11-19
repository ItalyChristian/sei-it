import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const cardContainer = style({
  background: "white",
  padding: "24px",
  border: `1px solid ${colors.border}`,
  borderRadius: radii.xl,
  boxShadow: colors.shadowSm,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});
