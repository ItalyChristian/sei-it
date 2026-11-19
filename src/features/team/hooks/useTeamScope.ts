import { Ticket } from "@/entities/ticket/ticket.types";
import { UserRole } from "@/entities/user/user-roles.enum";
import { User } from "@/entities/user/user.types";
import { useAuth } from "@/shared/contexts/session.context";
import { useMemo } from "react";

export function useTeamScope(tickets: Ticket[], users: User[]) {
  const { user } = useAuth();

  const managerGroupIds = useMemo(
    () => user?.grupos_ids ?? (user?.grupo_id ? [user.grupo_id] : []),
    [user],
  );

  const teamTickets = useMemo(
    () =>
      managerGroupIds.length > 0
        ? tickets.filter((t) => managerGroupIds.includes(t.grupo_id))
        : tickets,
    [tickets, managerGroupIds],
  );

  const teamUsers = useMemo(
    () =>
      users.filter(
        (member) =>
          member.perfil === UserRole.OPERATOR &&
          (managerGroupIds.length === 0 ||
            [member.grupo_id, ...(member.grupos_ids ?? [])].some(
              (gid) => gid !== undefined && managerGroupIds.includes(gid),
            )),
      ),
    [users, managerGroupIds],
  );

  return { teamTickets, teamUsers };
}
