export enum SlaPriority {
  LOW = "baixa",
  MEDIUM = "media",
  HIGH = "alta",
  CRITICAL = "critica",
}

export const priorityLabels: Record<SlaPriority, string> = {
  [SlaPriority.CRITICAL]: "Crítica",
  [SlaPriority.HIGH]: "Alta",
  [SlaPriority.MEDIUM]: "Média",
  [SlaPriority.LOW]: "Baixa",
};
