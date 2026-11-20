"use client";

import { useTickets } from "@/entities/ticket/useTickets";
import { useUsers } from "@/entities/user/useUsers";
import { ChatPanel } from "@/features/chat/components/ChatPanel";
import { useAuth } from "@/shared/contexts/session.context";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Spinner } from "@/shared/components/Spinner";
import { useEffect } from "react";
import * as styles from "../styles/ticket-detail.css";

interface TicketDetailProps {
  id: string;
}

export const TicketDetail = ({ id }: TicketDetailProps) => {
  const router = useRouter();
  const { user, isLoading: isLoadingAuth } = useAuth();

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
        <Spinner size="lg" centered label="Carregando chamado..." />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className={styles.notFound}>
        <h1>Chamado não encontrado</h1>
        <p>O chamado que você está procurando não existe ou foi removido.</p>
        <Link href="/chat" className={styles.backLink}>
          <ArrowLeft size={16} />
          Voltar para a fila
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link href="/chat" className={styles.backLink}>
          <ArrowLeft size={16} />
          Voltar para a fila
        </Link>
      </div>

      <div className={styles.content}>
        <ChatPanel ticket={ticket} users={users} />
      </div>
    </div>
  );
};
