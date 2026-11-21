import type { TicketCategory } from "@/entities/ticket/category/ticket-category.types";
import type { Ticket } from "@/entities/ticket/ticket.types";
import type { UserSummary } from "@/entities/user/user.types";

export interface TicketsTableProps {
  tickets: Ticket[];
  users: UserSummary[];
  categories: TicketCategory[];
  referenceDate: string;
  isLoading: boolean;

  variant?: "manager" | "operator" | "client";
  currentUserId?: string;
}

export interface TicketsTableWrapperProps {
  variant: TicketsTableVariant;
  initialFilter?: InitialFilter;
}

export type TicketsTableVariant = "manager" | "operator" | "client";

export type InitialFilter = "all" | "mine" | "unassigned" | "sla-at-risk";
