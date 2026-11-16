import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const slaBadge = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 9px",
  borderRadius: radii.full,
  fontSize: "11px",
  fontWeight: 600,
  whiteSpace: "nowrap",
});

export const slaVariants = styleVariants({
  overdue: {
    color: colors.dangerRed,
    backgroundColor: `color-mix(in srgb, ${colors.dangerRed} 12%, white)`,
  },
  risk: {
    color: colors.warningOrange,
    backgroundColor: `color-mix(in srgb, ${colors.warningOrange} 14%, white)`,
  },
  ok: {
    color: colors.successGreen,
    backgroundColor: `color-mix(in srgb, ${colors.successGreen} 12%, white)`,
  },
});
