import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { style, styleVariants } from "@vanilla-extract/css";

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 9px",
  borderRadius: radii.full,
  fontSize: "11px",
  fontWeight: 600,
  whiteSpace: "nowrap",
});

export const badgeVariants = styleVariants({
  critical: {
    color: colors.dangerRed,
    backgroundColor: `color-mix(in srgb, ${colors.dangerRed} 12%, white)`,
  },
  high: {
    color: colors.warningOrange,
    backgroundColor: `color-mix(in srgb, ${colors.warningOrange} 14%, white)`,
  },
  medium: {
    color: colors.textDark,
    backgroundColor: `color-mix(in srgb, ${colors.accentYellow} 55%, white)`,
  },
  low: {
    color: colors.successGreen,
    backgroundColor: `color-mix(in srgb, ${colors.successGreen} 12%, white)`,
  },
});

export const slaPriorityCritical = style([badge, badgeVariants.critical]);
export const slaPriorityHigh = style([badge, badgeVariants.high]);
export const slaPriorityMedium = style([badge, badgeVariants.medium]);
export const slaPriorityLow = style([badge, badgeVariants.low]);
