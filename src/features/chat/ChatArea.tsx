import { Ticket } from "@/entities/ticket/ticket.types";
import { User } from "@/entities/user/user.types";
import { ChatPanelEmptyState } from "./ChatPanelEmptyState";
import { ChatPanel } from "./components/ChatPanel";

interface ChatAreaProps {
  selectedTicket: Ticket | null;
  users: User[];
}

export function ChatArea({ selectedTicket, users }: ChatAreaProps) {
  if (!selectedTicket) {
    return <ChatPanelEmptyState />;
  }

  return <ChatPanel ticket={selectedTicket} users={users} />;
}
