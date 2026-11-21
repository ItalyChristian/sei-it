"use client";

import { priorityBadge, priorityLabels } from "@/entities/sla/sla-priority-map";
import { SlaStatus } from "@/entities/sla/sla-status.types";
import { statusBadge, statusLabel } from "@/entities/ticket/ticket-status-map";
import { Ticket } from "@/entities/ticket/ticket.types";
import { UserRole } from "@/entities/user/user-roles.enum";
import { User } from "@/entities/user/user.types";
import { useAuth } from "@/shared/contexts/session.context";
import { TicketStatusControl } from "./TicketStatusControl";
import { useReferenceDate } from "@/shared/hooks/useReferenceDate";
import { formatInTimeZone } from "date-fns-tz";
import { CheckCircle2, Clock, Info, User as UserIcon } from "lucide-react";
import { useMemo } from "react";
import * as styles from "./chat-header.css";

interface ChatHeaderProps {
  ticket: Ticket;
  users: User[];
  typingLabel?: string | null;
  onAssume: () => void;
  isAssuming: boolean;
}

export function ChatHeader({
  ticket,
  users,
  typingLabel,
  onAssume,
  isAssuming,
}: ChatHeaderProps) {
  const { user } = useAuth();
  const { timezone } = useReferenceDate();

  const responsavel = useMemo(
    () => users.find((u) => u.id === ticket.responsavel_id),
    [users, ticket.responsavel_id],
  );

  const solicitante = useMemo(
    () => users.find((u) => u.id === ticket.solicitante_id),
    [users, ticket.solicitante_id],
  );

  const isUnassigned = !ticket.responsavel_id;
  const isClosed =
    ticket.status === SlaStatus.CLOSED || ticket.status === SlaStatus.RESOLVED;

  const prazo = formatInTimeZone(
    new Date(ticket.prazo_resolucao),
    timezone,
    "dd/MM 'às' HH:mm",
  );

  return (
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <div className={styles.titleBlock}>
          <div className={styles.badges}>
            <span className={styles.ticketId}>#TK-{ticket.numero}</span>
            <span className={statusBadge[ticket.status]}>
              {statusLabel[ticket.status]}
            </span>
            {user?.perfil !== UserRole.CLIENT && (
              <span className={priorityBadge[ticket.prioridade]}>
                {priorityLabels[ticket.prioridade]}
              </span>
            )}
          </div>
          <h1 className={styles.title}>{ticket.titulo}</h1>
          {typingLabel && (
            <span className={styles.typingIndicator} role="status">
              {typingLabel}
            </span>
          )}
        </div>

        <div className={styles.actions}>
          {user?.perfil === UserRole.OPERATOR && isUnassigned && !isClosed && (
            <button
              type="button"
              className={styles.assumeButton}
              onClick={onAssume}
              disabled={isAssuming}
            >
              <CheckCircle2 size={16} />
              {isAssuming ? "Assumindo..." : "Assumir chamado"}
            </button>
          )}
        </div>
      </div>

      <TicketStatusControl
        key={`${ticket.id}-${ticket.status}`}
        ticketId={ticket.id}
        status={ticket.status}
      />

      <div className={styles.info}>
        <span className={styles.infoItem}>
          <Info size={16} />
          ID: {ticket.id.slice(0, 8)}
        </span>
        <span className={styles.infoItem}>
          <Clock size={16} />
          Prazo: {prazo}
        </span>
        <span className={styles.infoItem}>
          <UserIcon size={16} />
          Solicitante: {solicitante?.nome ?? "—"}
        </span>
        <span className={styles.infoItem}>
          <UserIcon size={16} />
          Atendente: {responsavel?.nome ?? "Não atribuído"}
        </span>
      </div>
    </div>
  );
}
