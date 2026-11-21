import {
  slaDeadlineBadge,
} from "@/entities/sla/sla-deadline-status-map";
import { colors } from "@/shared/styles/colors.css";
import { style } from "@vanilla-extract/css";

export const slaInfo = style({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "6px",
});

export const duration = style({
  color: colors.textDark,
  fontSize: "12px",
  fontWeight: 600,
});

export const badge = slaDeadlineBadge;
