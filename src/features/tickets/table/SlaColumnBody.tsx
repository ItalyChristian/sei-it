import type { Ticket } from "@/entities/ticket/ticket.types";
import * as styles from "./sla-status.css";

const hourInMs = 60 * 60 * 1000;

export function SlaColumnBody(ticket: Ticket, referenceDate: string) {
  const resolvedAt = ticket.resolvido_em ?? ticket.fechado_em;

  const referenceTimestamp = Date.parse(resolvedAt ?? referenceDate);

  const remaining = Date.parse(ticket.prazo_resolucao) - referenceTimestamp;

  const isOverdue = remaining < 0;

  const isAtRisk = !resolvedAt && remaining < 2 * hourInMs;

  const variant = isOverdue
    ? styles.slaVariants.overdue
    : isAtRisk
      ? styles.slaVariants.risk
      : styles.slaVariants.ok;

  let label = "Cumprido";

  if (!resolvedAt && remaining >= 2 * hourInMs) {
    label = `${Math.floor(remaining / hourInMs)}h`;
  } else if (!resolvedAt && remaining >= 0) {
    const hours = Math.floor(remaining / hourInMs);
    const minutes = Math.floor((remaining % hourInMs) / 60000);
    label = `${hours}h ${minutes}m`;
  } else if (isOverdue) {
    label = "Estourado";
  }

  return <span className={`${styles.slaBadge} ${variant}`}>{label}</span>;
}
