import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { style } from "@vanilla-extract/css";

export const container = style({
  background: "white",
  padding: "24px",
  border: `1px solid ${colors.border}`,
  borderRadius: radii.xl,
  boxShadow: colors.shadowSm,
});
