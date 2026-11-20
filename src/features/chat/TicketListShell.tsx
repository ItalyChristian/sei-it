"use client";

import { useTickets } from "@/entities/ticket/useTickets";
import { useUsers } from "@/entities/user/useUsers";
import { useAuth } from "@/shared/contexts/session.context";
import { useRealtimeEvents } from "@/shared/hooks/useRealTimeEvents";
import { useMemo, useState } from "react";
import { TicketList } from "../tickets/TicketList";
import { ChatArea } from "./ChatArea";
import * as styles from "./styles/ticket-list-shell.css";

export function TicketListShell() {
  const { user } = useAuth();

  const { data: tickets = [], isLoading: isLoadingTickets } = useTickets();
  const { data: users = [], isLoading: isLoadingUsers } = useUsers();

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const [unreadTickets] = useState<Set<string>>(
    () => new Set(["4ca8212a-d627-45c2-810d-a1ba92d0eaf0"]),
  );

  useRealtimeEvents();

  const myTickets = useMemo(() => {
    if (!user) return tickets;
    return tickets.filter(
      (t) => t.responsavel_id === user.id || !t.responsavel_id,
    );
  }, [tickets, user]);

  const selectedTicket = useMemo(
    () => myTickets.find((t) => t.id === selectedTicketId) ?? null,
    [myTickets, selectedTicketId],
  );

  const isLoading = isLoadingTickets || isLoadingUsers;

  return (
    <div className={styles.shell}>
      <TicketList
        tickets={myTickets}
        selectedTicketId={selectedTicketId}
        onSelectTicket={setSelectedTicketId}
        unreadTickets={unreadTickets}
        isLoading={isLoading}
      />

      <ChatArea selectedTicket={selectedTicket} users={users} />
    </div>
  );
}
