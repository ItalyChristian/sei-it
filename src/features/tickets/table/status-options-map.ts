import { SlaStatus } from "@/entities/sla/sla-status.types";
import { statusLabel } from "@/entities/ticket/ticket-status-map";

export const statusOptions = Object.values(SlaStatus).map((status) => ({
  label: statusLabel[status],
  value: status,
}));
