import { Ticket } from "@/entities/ticket/ticket.types";
import { SlaDeadlineStatus } from "./sla-deadline-status-map";

export type TicketSlaFilterValue =
  | "on-track"
  | "at-risk"
  | "overdue"
  | "completed"
  | "unknown";

export interface TicketSlaEvaluation {
  filterValue: TicketSlaFilterValue;
  badgeStatus: SlaDeadlineStatus;
  label: string;
  durationMs: number | null;
}

const riskWindowMs = 2 * 60 * 60 * 1000;

export function evaluateTicketSla(
  ticket: Ticket,
  asOfDate: string,
): TicketSlaEvaluation {
  const completedAt = ticket.resolvido_em ?? ticket.fechado_em;
  const referenceTime = Date.parse(completedAt ?? asOfDate);
  const deadline = Date.parse(ticket.prazo_resolucao);
  const remainingMs = deadline - referenceTime;

  if (!Number.isFinite(referenceTime) || !Number.isFinite(deadline)) {
    return {
      filterValue: "unknown",
      badgeStatus: "risk",
      label: "Prazo indisponível",
      durationMs: null,
    };
  }

  if (completedAt) {
    const overdue = remainingMs < 0;
    return {
      filterValue: overdue ? "overdue" : "completed",
      badgeStatus: overdue ? "overdue" : "ok",
      label: overdue ? "Excedido" : "Cumprido",
      durationMs: null,
    };
  }

  if (remainingMs < 0) {
    return {
      filterValue: "overdue",
      badgeStatus: "overdue",
      label: "Excedido",
      durationMs: Math.abs(remainingMs),
    };
  }

  if (remainingMs < riskWindowMs) {
    return {
      filterValue: "at-risk",
      badgeStatus: "risk",
      label: "Em risco",
      durationMs: remainingMs,
    };
  }

  return {
    filterValue: "on-track",
    badgeStatus: "ok",
    label: "No prazo",
    durationMs: remainingMs,
  };
}

export function formatSlaDuration(durationMs: number) {
  const totalMinutes = Math.floor(durationMs / 60_000);
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return hours > 0
      ? `${days} ${days === 1 ? "dia" : "dias"} e ${hours}h`
      : `${days} ${days === 1 ? "dia" : "dias"}`;
  }
  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
  }
  return `${minutes} min`;
}
