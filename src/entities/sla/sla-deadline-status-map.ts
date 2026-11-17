import {
  slaDeadlineOk,
  slaDeadlineOverdue,
  slaDeadlineRisk,
} from "./styles/sla-deadline-badge.css";

export type SlaDeadlineStatus = "overdue" | "risk" | "ok";

export const slaDeadlineBadge: Record<SlaDeadlineStatus, string> = {
  overdue: slaDeadlineOverdue,
  risk: slaDeadlineRisk,
  ok: slaDeadlineOk,
};
