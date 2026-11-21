import { UserRole } from "@/entities/user/user-roles.enum";
import { User } from "@/entities/user/user.types";
import { Ticket } from "./ticket.types";

export function getTicketsVisibleToUser(tickets: Ticket[], user: User) {
  switch (user.perfil) {
    case UserRole.MANAGER:
      return tickets;
    case UserRole.CLIENT:
      return tickets.filter((ticket) => ticket.solicitante_id === user.id);
    case UserRole.OPERATOR: {
      const groupIds = new Set(
        [user.grupo_id, ...(user.grupos_ids ?? [])].filter(
          (groupId): groupId is string => Boolean(groupId),
        ),
      );

      return tickets.filter(
        (ticket) =>
          ticket.responsavel_id === user.id ||
          (!ticket.responsavel_id && groupIds.has(ticket.grupo_id)),
      );
    }
  }
}

export function canUserAccessTicket(ticket: Ticket, user: User) {
  return getTicketsVisibleToUser([ticket], user).length > 0;
}
