"use client";

import { useTickets } from "@/entities/ticket/useTickets";
import { getTicketsVisibleToUser } from "@/entities/ticket/ticket-access";
import { useUsers } from "@/entities/user/useUsers";
import { useAuth } from "@/shared/contexts/session.context";
import { backLink } from "@/shared/styles/components/back-link.css";
import { useRealtimeEvents } from "@/shared/hooks/useRealTimeEvents";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { TicketList } from "../tickets/components/TicketList";
import * as styles from "./chat-area-shell.css";
import { ChatArea } from "./components/ChatArea/ChatArea";

export function ChatAreaShell() {
  const { user } = useAuth();

  const {
    data: tickets = [],
    isLoading: isLoadingTickets,
    isPending,
  } = useTickets();
  const { data: users = [] } = useUsers();

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const [unreadTickets] = useState<Set<string>>(
    () => new Set(["4ca8212a-d627-45c2-810d-a1ba92d0eaf0"]),
  );

  useRealtimeEvents();

  const myTickets = useMemo(() => {
    if (!user) return tickets;
    return getTicketsVisibleToUser(tickets, user);
  }, [tickets, user]);

  const selectedTicket = useMemo(
    () => myTickets.find((t) => t.id === selectedTicketId) ?? null,
    [myTickets, selectedTicketId],
  );

  const isLoading = isLoadingTickets || isPending;

  return (
    <div className={styles.shell}>
      <div className={styles.toolbar}>
        <Link href="/dashboard" className={backLink}>
          <ArrowLeft size={16} />
          Voltar para a Dashboard
        </Link>
      </div>
      <div className={styles.content}>
        <TicketList
          tickets={myTickets}
          selectedTicketId={selectedTicketId}
          onSelectTicket={setSelectedTicketId}
          unreadTickets={unreadTickets}
          isLoading={isLoading}
        />

        <ChatArea
          selectedTicket={selectedTicket}
          users={users}
          onBackToQueue={() => setSelectedTicketId(null)}
        />
      </div>
    </div>
  );
}
