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

export const slaDeadlineOverdue = style([badge, badgeVariants.overdue]);
export const slaDeadlineRisk = style([badge, badgeVariants.risk]);
export const slaDeadlineOk = style([badge, badgeVariants.ok]);
