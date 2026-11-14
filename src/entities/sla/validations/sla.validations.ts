import { z } from "zod";
import { SlaPriority } from "../sla-priority.types";
import { SlaStatus } from "../sla-status.types";

export const slaPrioritySchema = z.nativeEnum(SlaPriority);
export const slaStatusSchema = z.nativeEnum(SlaStatus);
