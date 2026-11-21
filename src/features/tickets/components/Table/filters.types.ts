import { SlaStatus } from "@/entities/sla/sla-status.types";
import { SlaPriority } from "@/entities/sla/sla-priority.types";
import { TicketSlaFilterValue } from "@/entities/sla/ticket-sla";
import type { ResponsibleOption } from "./responsible-options";

export interface TicketsTableFiltersProps {
  search: string;
  responsibleId: string | null;
  status: SlaStatus | null;
  slaFilter: TicketSlaFilterValue | null;
  priority: SlaPriority | null;
  responsibleOptions: ResponsibleOption[];
  onSearchChange: (value: string) => void;
  onResponsibleChange: (value: string | null) => void;
  onStatusChange: (value: SlaStatus | null) => void;
  onSlaFilterChange: (value: TicketSlaFilterValue | null) => void;
  onPriorityChange: (value: SlaPriority | null) => void;
  showResponsibleFilter: boolean;
  showAllResponsibleOption: boolean;
  showPriorityFilter: boolean;
}
