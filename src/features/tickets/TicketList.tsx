"use client";

import { statusBadge, statusLabel } from "@/entities/ticket/ticket-status-map";
import { useTickets } from "@/entities/ticket/useTickets";
import * as ticket from "@/features/tickets/ticket.css";
import clsx from "clsx";
import { TicketListEmptyState } from "./EmptyState";

import { TicketListLoading } from "./TicketListLoading";
import { snippet as buildSnippet } from "./trim-description";

export const TicketList = () => {
  const { data: tickets, isLoading, error } = useTickets();

  if (isLoading) {
    return <TicketListLoading />;
  }

  if (error) {
    return <div className={ticket.list}>Erro ao carregar: {error.message}</div>;
  }

  if (!tickets || tickets.length === 0) {
    return <TicketListEmptyState />;
  }

  return (
    <div className={ticket.list}>
      {tickets.map((t, index) => (
        <div
          key={t.id}
          className={clsx(ticket.item, index === 0 && ticket.active)}
        >
          <div className={ticket.meta}>
            <span className={ticket.id}>#TK-{t.numero}</span>
            <span className={statusBadge[t.status]}>
              {statusLabel[t.status]}
            </span>
          </div>

          <div className={ticket.title}>{t.titulo}</div>
          <div className={ticket.snippet}>{buildSnippet(t.descricao)}</div>
        </div>
      ))}
    </div>
  );
};
