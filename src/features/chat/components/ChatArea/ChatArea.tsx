import { Ticket } from "@/entities/ticket/ticket.types";
import { User } from "@/entities/user/user.types";
import { ChatPanel } from "../ChatPanel/ChatPanel";
import { ChatPanelEmptyState } from "./ChatPanelEmptyState";

interface ChatAreaProps {
  selectedTicket: Ticket | null;
  users: User[];
  onBackToQueue: () => void;
}

export function ChatArea({
  selectedTicket,
  users,
  onBackToQueue,
}: ChatAreaProps) {
  if (!selectedTicket) {
    return <ChatPanelEmptyState />;
  }

  return (
    <ChatPanel
      ticket={selectedTicket}
      users={users}
      onBackToQueue={onBackToQueue}
    />
  );
}
