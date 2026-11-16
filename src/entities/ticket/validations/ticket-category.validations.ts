import { z } from "zod";
import { TicketCategoryName as CategoryNameEnum } from "../category/ticket-category.types";

export const ticketCategoryNameSchema = z.nativeEnum(CategoryNameEnum);

export const ticketCategorySchema = z.object({
  id: z.string().uuid(),
  nome: ticketCategoryNameSchema,
  grupo_id: z.string().uuid(),
});

export type TicketCategory = z.infer<typeof ticketCategorySchema>;
export type TicketCategoryName = z.infer<typeof ticketCategoryNameSchema>;
