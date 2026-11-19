import * as styles from "./operator-card.css";

export type LoadTone = "success" | "warning" | "danger";
export type BadgeTone = "danger" | "warning";

export interface OperatorCardVisuals {
  badgeLabel: string | null;
  badgeTone: BadgeTone | null;
  loadTone: LoadTone;
  statusLabel: string;
  statusClass: string;
}

export function getOperatorCardVisuals({
  activeTickets,
  slaRiskTickets,
  overdueTickets,
}: {
  activeTickets: number;
  slaRiskTickets: number;
  overdueTickets: number;
}): OperatorCardVisuals {
  let badgeLabel: string | null = null;
  let badgeTone: BadgeTone | null = null;

  if (overdueTickets > 0) {
    badgeLabel = "SLA excedido";
    badgeTone = "danger";
  } else if (slaRiskTickets > 0) {
    badgeLabel = "SLA em risco";
    badgeTone = "warning";
  }

  const loadTone: LoadTone =
    overdueTickets > 0 ? "danger" : slaRiskTickets > 0 ? "warning" : "success";

  const statusLabel =
    activeTickets > 0 ? "Com chamados ativos" : "Sem chamados ativos";
  const statusClass =
    activeTickets > 0 ? styles.status.active : styles.status.idle;

  return { badgeLabel, badgeTone, loadTone, statusLabel, statusClass };
}
