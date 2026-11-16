import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./user.api";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: Infinity,
  });
}
