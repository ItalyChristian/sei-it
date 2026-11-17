"use client";

import type { Ticket } from "@/entities/ticket/ticket.types";
import * as styles from "./tickets-table.css";

interface TicketTitleProps {
  ticket: Ticket;
  categoryName: string;
}

export function TicketTitle({ ticket, categoryName }: TicketTitleProps) {
  return (
    <div className={styles.ticketCell}>
      <span className={styles.ticketTitle}>{ticket.titulo}</span>
      <span className={styles.ticketCategory}>Categoria: {categoryName}</span>
    </div>
  );
}
