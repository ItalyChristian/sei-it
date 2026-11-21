import { evaluateTicketSla, formatSlaDuration } from "@/entities/sla/ticket-sla";
import type { Ticket } from "@/entities/ticket/ticket.types";
import * as styles from "./sla-column.css";

export function SlaColumnBody(ticket: Ticket, asOfDate: string) {
  const evaluation = evaluateTicketSla(ticket, asOfDate);

  return (
    <div className={styles.slaInfo}>
      {evaluation.durationMs !== null && (
        <span className={styles.duration}>
          {formatSlaDuration(evaluation.durationMs)}
        </span>
      )}
      <span className={styles.badge[evaluation.badgeStatus]}>
        {evaluation.label}
      </span>
    </div>
  );
}
