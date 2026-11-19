import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const badgeBase = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  padding: "2px 10px",
  borderRadius: "9999px",
  fontSize: "11px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.02em",
  border: "1px solid transparent",
  whiteSpace: "nowrap",
});

export const tone = {
  neutral: style({
    backgroundColor: colors.status.neutral.bg,
    color: colors.status.neutral.text,
    borderColor: colors.status.neutral.border,
  }),
  info: style({
    backgroundColor: colors.status.info.bg,
    color: colors.status.info.text,
    borderColor: colors.status.info.border,
  }),
  success: style({
    backgroundColor: colors.status.success.bg,
    color: colors.status.success.text,
    borderColor: colors.status.success.border,
  }),
  warning: style({
    backgroundColor: colors.status.warning.bg,
    color: colors.status.warning.text,
    borderColor: colors.status.warning.border,
  }),
  danger: style({
    backgroundColor: colors.status.danger.bg,
    color: colors.status.danger.text,
    borderColor: colors.status.danger.border,
  }),
};
