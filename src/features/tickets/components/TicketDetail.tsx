"use client";

import { useTickets } from "@/entities/ticket/useTickets";
import { canUserAccessTicket } from "@/entities/ticket/ticket-access";
import { useUsers } from "@/entities/user/useUsers";
import { ChatPanel } from "@/features/chat/components/ChatPanel/ChatPanel";
import { useAuth } from "@/shared/contexts/session.context";
import { useRealtimeEvents } from "@/shared/hooks/useRealTimeEvents";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { LoadingState } from "@/shared/components/LoadingState";
import { useEffect } from "react";
import * as styles from "../styles/ticket-detail.css";

interface TicketDetailProps {
  id: string;
}

export const TicketDetail = ({ id }: TicketDetailProps) => {
  const router = useRouter();
  const { user, isLoading: isLoadingAuth } = useAuth();
  useRealtimeEvents();

  const { data: tickets = [], isLoading: isLoadingTickets } = useTickets();
  const { data: users = [], isLoading: isLoadingUsers } = useUsers();

  useEffect(() => {
    if (!isLoadingAuth && !user) {
      router.push("/");
    }
  }, [user, isLoadingAuth, router]);

  const ticket = tickets.find((t) => t.id === id);

  if (!user) {
    return null;
  }

  if (isLoadingAuth || isLoadingTickets || isLoadingUsers) {
    return (
      <div className={styles.page}>
        <LoadingState size="lg" label="Carregando chamado..." />
      </div>
    );
  }

  if (!ticket || !canUserAccessTicket(ticket, user)) {
    return (
      <div className={styles.notFound}>
        <h1>Chamado indisponível</h1>
        <p>O chamado não existe ou não está disponível para este perfil.</p>
        <Link href="/chat" className={styles.backLink}>
          <ArrowLeft size={16} />
          Voltar para a fila
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <ChatPanel ticket={ticket} users={users} />
      </div>
    </div>
  );
};
