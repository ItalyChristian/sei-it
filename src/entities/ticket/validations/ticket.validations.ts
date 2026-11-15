import {
  slaPrioritySchema,
  slaStatusSchema,
} from "@/entities/sla/validations/sla.validations";
import { z } from "zod";

export const ticketStateSchema = z.object({
  sla_pausado: z.boolean(),
  aberto_em: z.string().datetime(),
  resolvido_em: z.string().datetime().nullable(),
  fechado_em: z.string().datetime().nullable(),
});

export const ticketTimestampsSchema = z.object({
  atualizado_em: z.string().datetime(),
  primeira_resposta_em: z.string().datetime().nullable(),
  prazo_primeira_resposta: z.string().datetime(),
  prazo_resolucao: z.string().datetime(),
});

export const ticketSchema = z
  .object({
    id: z.string().uuid(),
    numero: z.number().int().positive(),
    titulo: z.string().min(1),
    descricao: z.string().min(1),
    categoria_id: z.string().uuid(),
    grupo_id: z.string().uuid(),
    prioridade: slaPrioritySchema,
    status: slaStatusSchema,
    solicitante_id: z.string().uuid(),
    responsavel_id: z.string().uuid().optional(),
  })
  .merge(ticketTimestampsSchema)
  .merge(ticketStateSchema);

export type Ticket = z.infer<typeof ticketSchema>;
