import { SlaPriority } from "@/entities/sla/sla-priority.types";
import {
  slaPriorityCritical,
  slaPriorityHigh,
  slaPriorityLow,
  slaPriorityMedium,
} from "./styles/sla-priority-badge.css";

export const priorityLabels: Record<SlaPriority, string> = {
  [SlaPriority.CRITICAL]: "Crítica",
  [SlaPriority.HIGH]: "Alta",
  [SlaPriority.MEDIUM]: "Média",
  [SlaPriority.LOW]: "Baixa",
};

export const priorityBadge: Record<SlaPriority, string> = {
  [SlaPriority.CRITICAL]: slaPriorityCritical,
  [SlaPriority.HIGH]: slaPriorityHigh,
  [SlaPriority.MEDIUM]: slaPriorityMedium,
  [SlaPriority.LOW]: slaPriorityLow,
};
