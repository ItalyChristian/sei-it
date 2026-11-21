"use client";

import { useTickets } from "@/entities/ticket/useTickets";
import { getTicketsVisibleToUser } from "@/entities/ticket/ticket-access";
import { getMessages } from "@/entities/chat/chat.api";
import { UserRole } from "@/entities/user/user-roles.enum";
import { useUsers } from "@/entities/user/useUsers";
import { useAuth } from "@/shared/contexts/session.context";
import { backLink } from "@/shared/styles/components/back-link.css";
import { useRealtimeEvents } from "@/shared/hooks/useRealTimeEvents";
import { useQueries } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { TicketList } from "../tickets/components/TicketList";
import * as styles from "./chat-area-shell.css";
import { ChatArea } from "./components/ChatArea/ChatArea";

const READ_STATE_KEY = "seiit_read_messages";
const READ_STATE_EVENT = "seiit-read-state";

function getReadStateSnapshot() {
  try {
    return localStorage.getItem(READ_STATE_KEY) ?? "{}";
  } catch (error) {
    console.error("Erro ao acessar o estado de leitura das mensagens", error);
    return "{}";
  }
}

function subscribeToReadState(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(READ_STATE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(READ_STATE_EVENT, onChange);
  };
}

export function ChatAreaShell() {
  const { user } = useAuth();

  const {
    data: tickets = [],
    isLoading: isLoadingTickets,
    isPending,
  } = useTickets();
  const { data: users = [] } = useUsers();

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const readStateSnapshot = useSyncExternalStore(
    subscribeToReadState,
    getReadStateSnapshot,
    () => "{}",
  );
  const readAtByUser = useMemo(() => {
    try {
      return JSON.parse(readStateSnapshot) as Record<
        string,
        Record<string, string>
      >;
    } catch (error) {
      console.error("Estado de leitura das mensagens inválido", error);
      return {};
    }
  }, [readStateSnapshot]);
  const [typingByTicket, setTypingByTicket] = useState<
    Record<string, { nome: string; expiresAt: number }>
  >({});

  const myTickets = useMemo(() => {
    if (!user) return tickets;
    return getTicketsVisibleToUser(tickets, user);
  }, [tickets, user]);

  const messageQueries = useQueries({
    queries: myTickets.map((ticket) => ({
      queryKey: ["messages", ticket.id],
      queryFn: () => getMessages(ticket.id),
    })),
  });

  const currentUserId = user?.id;
  const readAtByTicket = useMemo(
    () => (currentUserId ? (readAtByUser[currentUserId] ?? {}) : {}),
    [currentUserId, readAtByUser],
  );

  const markTicketRead = useCallback(
    (ticketId: string) => {
      if (!currentUserId) return;
      try {
        const current = JSON.parse(getReadStateSnapshot()) as Record<
          string,
          Record<string, string>
        >;
        localStorage.setItem(
          READ_STATE_KEY,
          JSON.stringify({
            ...current,
            [currentUserId]: {
              ...current[currentUserId],
              [ticketId]: new Date().toISOString(),
            },
          }),
        );
        window.dispatchEvent(new Event(READ_STATE_EVENT));
      } catch (error) {
        console.error("Erro ao salvar o estado de leitura das mensagens", error);
      }
    },
    [currentUserId],
  );

  const handleTyping = useCallback(
    (payload: {
      ticket_id: string;
      usuario_id: string;
      nome: string;
      digitando: boolean;
    }) => {
      if (payload.usuario_id === user?.id) return;
      setTypingByTicket((current) => {
        const next = { ...current };
        if (payload.digitando) {
          next[payload.ticket_id] = {
            nome: payload.nome,
            expiresAt: Date.now() + 2500,
          };
        } else {
          delete next[payload.ticket_id];
        }
        return next;
      });
    },
    [user?.id],
  );

  useRealtimeEvents(handleTyping);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTypingByTicket((current) => {
        const next = Object.fromEntries(
          Object.entries(current).filter(([, typing]) => typing.expiresAt > now),
        );
        return Object.keys(next).length === Object.keys(current).length
          ? current
          : next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const selectedTicketIndex = myTickets.findIndex(
    (ticket) => ticket.id === selectedTicketId,
  );
  const selectedMessagesUpdatedAt =
    selectedTicketIndex >= 0
      ? messageQueries[selectedTicketIndex]?.dataUpdatedAt
      : undefined;

  useEffect(() => {
    if (selectedTicketId && selectedMessagesUpdatedAt) {
      markTicketRead(selectedTicketId);
    }
  }, [markTicketRead, selectedMessagesUpdatedAt, selectedTicketId]);

  const unreadTickets = useMemo(() => {
    if (user?.perfil !== UserRole.OPERATOR) return new Set<string>();

    const unread = new Set<string>();
    myTickets.forEach((ticket, index) => {
      if (ticket.id === selectedTicketId) return;
      const readAt = readAtByTicket[ticket.id];
      const readAtTime = readAt ? new Date(readAt).getTime() : -Infinity;
      const messages = messageQueries[index]?.data;
      if (
        messages?.some(
          (message) =>
            message.autor_id !== user.id &&
            new Date(message.criado_em).getTime() > readAtTime,
        )
      ) {
        unread.add(ticket.id);
      }
    });
    return unread;
  }, [messageQueries, myTickets, readAtByTicket, selectedTicketId, user]);

  const typingTicketIds = useMemo(
    () => new Set(Object.keys(typingByTicket)),
    [typingByTicket],
  );

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
          onSelectTicket={(id) => {
            if (selectedTicketId) markTicketRead(selectedTicketId);
            markTicketRead(id);
            setSelectedTicketId(id);
          }}
          unreadTickets={unreadTickets}
          typingTicketIds={typingTicketIds}
          isLoading={isLoading}
        />

        <ChatArea
          selectedTicket={selectedTicket}
          users={users}
          typingLabel={
            selectedTicket
              ? typingByTicket[selectedTicket.id]
                ? `${typingByTicket[selectedTicket.id].nome} digitando`
                : null
              : null
          }
          onBackToQueue={() => {
            if (selectedTicketId) markTicketRead(selectedTicketId);
            setSelectedTicketId(null);
          }}
        />
      </div>
    </div>
  );
}
