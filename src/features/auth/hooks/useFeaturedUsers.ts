import { UserRole } from "@/entities/user/user-roles.enum";
import { User } from "@/entities/user/user.types";
import { useMemo } from "react";

export function useFeaturedUsers(users: User[]) {
  return useMemo(() => {
    const map = new Map<UserRole, User>();
    for (const user of users) {
      if (!map.has(user.perfil)) map.set(user.perfil, user);
      if (map.size === 3) break;
    }
    return Array.from(map.values());
  }, [users]);
}

// Preventive optimization: useMemo is not strictly required for the
// current small dataset, but it's a zero-cost safeguard that scales if
// data volume grows or the component gains re-render triggers.
