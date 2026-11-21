"use client";

import { SlaStatus } from "@/entities/sla/sla-status.types";
import { statusBadge, statusLabel } from "@/entities/ticket/ticket-status-map";
import { Ticket } from "@/entities/ticket/ticket.types";
import { UserRole } from "@/entities/user/user-roles.enum";
import { useAuth } from "@/shared/contexts/session.context";
import { useReferenceDate } from "@/shared/hooks/useReferenceDate";
import { useMemo, useState } from "react";
import { UnreadDot } from "../../chat/components/UnreadDot/UnreadDot";
import * as styles from "../styles/ticket-list.css";
import { TicketListEmptyState } from "./EmptyState";
import { snippet } from "../trim-description";
import { TicketListLoading } from "./TicketListLoading";
import { Search, X } from "lucide-react";

type FilterType = "mine" | "unassigned" | "overdue";

interface TicketListProps {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onSelectTicket: (id: string) => void;
  unreadTickets: Set<string>;
  typingTicketIds: Set<string>;
  isLoading: boolean;
}

export function TicketList({
  tickets,
  selectedTicketId,
  onSelectTicket,
  unreadTickets,
  typingTicketIds,
  isLoading,
}: TicketListProps) {
  const { user } = useAuth();
  const { date: referenceDate } = useReferenceDate();
  const [filter, setFilter] = useState<FilterType>("mine");
  const [search, setSearch] = useState("");
  const isClient = user?.perfil === UserRole.CLIENT;

  const now = referenceDate.getTime();

  // Contadores por filtro
  const counts = useMemo(() => {
    const mine = tickets.filter((t) =>
      isClient
        ? t.solicitante_id === user?.id
        : t.responsavel_id === user?.id,
    ).length;
    const unassigned = tickets.filter((t) => !t.responsavel_id).length;
    const overdue = tickets.filter((t) => {
      if (t.status === SlaStatus.CLOSED || t.status === SlaStatus.RESOLVED)
        return false;
      return new Date(t.prazo_resolucao).getTime() < now;
    }).length;
    return { mine, unassigned, overdue };
  }, [tickets, user?.id, isClient, now]);

  const filtered = useMemo(() => {
    switch (filter) {
      case "mine":
        if (isClient) {
          return tickets.filter((t) => t.solicitante_id === user?.id);
        }
        return tickets.filter((t) => t.responsavel_id === user?.id);
      case "unassigned":
        return tickets.filter((t) => !t.responsavel_id);
      case "overdue":
        return tickets.filter((t) => {
          if (t.status === SlaStatus.CLOSED || t.status === SlaStatus.RESOLVED)
            return false;
          return new Date(t.prazo_resolucao).getTime() < now;
        });
    }
  }, [tickets, filter, user?.id, isClient, now]);

  const normalizedSearch = search
    .trim()
    .toLocaleLowerCase("pt-BR")
    .replace(/^#?tk-/, "");
  const searchedTickets = filtered.filter((ticket) => {
    if (!normalizedSearch) return true;
    return (
      String(ticket.numero).includes(normalizedSearch) ||
      ticket.id.toLocaleLowerCase("pt-BR").includes(normalizedSearch) ||
      ticket.titulo.toLocaleLowerCase("pt-BR").includes(normalizedSearch)
    );
  });

  if (isLoading) {
    return <TicketListLoading />;
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.heading}>
          {isClient ? "Meus chamados" : "Fila de trabalho"}
        </h2>
        <div className={styles.searchWrap}>
          <Search size={16} aria-hidden="true" className={styles.searchIcon} />
          <input
            aria-label="Buscar chamado por ID ou título"
            className={styles.search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por ID ou título..."
            type="text"
            value={search}
          />
          {search && (
            <button
              type="button"
              aria-label="Limpar busca"
              className={styles.clearSearch}
              onClick={() => setSearch("")}
            >
              <X size={15} />
            </button>
          )}
        </div>
        {!isClient && (
          <div className={styles.pills}>
            <button
              type="button"
              className={`${styles.pill} ${filter === "mine" ? styles.pillActive : ""}`}
              onClick={() => setFilter("mine")}
            >
              Meus ({counts.mine})
            </button>
            <button
              type="button"
              className={`${styles.pill} ${filter === "unassigned" ? styles.pillActive : ""}`}
              onClick={() => setFilter("unassigned")}
            >
              Não atribuídos ({counts.unassigned})
            </button>
            <button
              type="button"
              className={`${styles.pill} ${filter === "overdue" ? styles.pillActive : ""} ${counts.overdue > 0 ? styles.pillDanger : ""}`}
              onClick={() => setFilter("overdue")}
            >
              Excedidos ({counts.overdue})
            </button>
          </div>
        )}
      </div>

      <div className={styles.list}>
        {searchedTickets.length === 0 ? (
          <TicketListEmptyState />
        ) : (
          searchedTickets.map((ticket) => {
            const isActive = ticket.id === selectedTicketId;
            const hasUnread = unreadTickets.has(ticket.id);

            return (
              <button
                key={ticket.id}
                type="button"
                className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                onClick={() => onSelectTicket(ticket.id)}
              >
                <div className={styles.itemMeta}>
                  <span className={styles.itemId}>#TK-{ticket.numero}</span>
                  <div className={styles.itemRight}>
                    {hasUnread && <UnreadDot visible />}
                    <span className={statusBadge[ticket.status]}>
                      {statusLabel[ticket.status]}
                    </span>
                  </div>
                </div>
                <div className={styles.itemTitle}>{ticket.titulo}</div>
                <div
                  className={`${styles.itemSnippet} ${
                    typingTicketIds.has(ticket.id) ? styles.typingSnippet : ""
                  }`}
                  role={typingTicketIds.has(ticket.id) ? "status" : undefined}
                >
                  {typingTicketIds.has(ticket.id)
                    ? "Digitando"
                    : snippet(ticket.descricao)}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
