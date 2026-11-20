import { useQuery } from "@tanstack/react-query";
import { getTickets } from "./ticket.api";

export function useTickets() {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
    // placeholderData: [],
  });
}
