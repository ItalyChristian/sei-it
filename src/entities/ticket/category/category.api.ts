import { http } from "@/shared/lib/http-client.lib";
import { TicketCategory } from "../ticket-category.types";

export async function getCategories(): Promise<TicketCategory[]> {
  return http<TicketCategory[]>("/categories");
}
