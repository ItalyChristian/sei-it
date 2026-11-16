import { SlaStatus } from "@/entities/sla/sla-status.types";
import {
  ticketAwaitingClient,
  ticketClosed,
  ticketOpen,
  ticketProgress,
  ticketResolved,
} from "./ticket-state-badge.css";

export const statusBadge: Record<SlaStatus, string> = {
  [SlaStatus.OPEN]: ticketOpen,
  [SlaStatus.IN_PROGRESS]: ticketProgress,
  [SlaStatus.AWAITING_CLIENT]: ticketAwaitingClient,
  [SlaStatus.RESOLVED]: ticketResolved,
  [SlaStatus.CLOSED]: ticketClosed,
};

export const statusLabel: Record<SlaStatus, string> = {
  [SlaStatus.OPEN]: "Aberto",
  [SlaStatus.IN_PROGRESS]: "Em Atendimento",
  [SlaStatus.AWAITING_CLIENT]: "Aguardando Cliente",
  [SlaStatus.RESOLVED]: "Resolvido",
  [SlaStatus.CLOSED]: "Fechado",
};
