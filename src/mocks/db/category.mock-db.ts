import dados from "@/mocks/dados.json";
import { TicketCategory } from "../../entities/ticket/category/ticket-category.types";

const categories = dados.categorias as TicketCategory[];

export const categoryMockDb = {
  list: () => categories,
};
