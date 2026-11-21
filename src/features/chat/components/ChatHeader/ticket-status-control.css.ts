import { colors } from "@/shared/styles/colors.css";
import { radii } from "@/shared/styles/sizes.css";
import { style } from "@vanilla-extract/css";

export const form = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
});

export const label = style({
  color: colors.textMuted,
  fontSize: "12px",
  fontWeight: 600,
});

const field = {
  border: `1px solid ${colors.border}`,
  borderRadius: radii.md,
  padding: "8px 10px",
  color: colors.textDark,
  font: "inherit",
  fontSize: "12px",
} as const;

export const select = style(field);
export const reason = style({ ...field, minWidth: "200px", flex: 1 });

export const submit = style({
  border: "none",
  borderRadius: radii.md,
  padding: "8px 12px",
  color: "white",
  background: colors.primary,
  fontSize: "12px",
  fontWeight: 600,
  cursor: "pointer",
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const error = style({
  color: colors.dangerRed,
  fontSize: "12px",
});
