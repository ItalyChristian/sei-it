"use client";

import type { Ticket } from "@/entities/ticket/ticket.types";
import Link from "next/link";
import * as styles from "./tickets-table.css";

interface TicketTitleProps {
  ticket: Ticket;
  categoryName: string;
  showCategory: boolean;
}

export function TicketTitle({
  ticket,
  categoryName,
  showCategory,
}: TicketTitleProps) {
  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className={styles.ticketCell}
      aria-label={`Abrir chamado #${ticket.numero}: ${ticket.titulo}`}
    >
      <span className={styles.ticketTitle}>{ticket.titulo}</span>
      {showCategory && (
        <span className={styles.ticketCategory}>
          Categoria: {categoryName}
        </span>
      )}
    </Link>
  );
}
