import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./user.api";
import { User } from "./user.types";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: Infinity,
    placeholderData: [] as User[],
  });
}
