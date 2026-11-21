import { SlaStatus } from "@/entities/sla/sla-status.types";
import type { ResponsibleOption } from "./responsible-options";

export interface TicketsTableFiltersProps {
  search: string;
  responsibleId: string | null;
  status: SlaStatus | null;
  responsibleOptions: ResponsibleOption[];
  onSearchChange: (value: string) => void;
  onResponsibleChange: (value: string | null) => void;
  onStatusChange: (value: SlaStatus | null) => void;
  showResponsibleFilter: boolean;
}
