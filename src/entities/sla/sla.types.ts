import { SlaPriority } from "./sla-priority.types";
import { SlaStatus } from "./sla-status.types";

export interface Sla {
  status: SlaStatus;
  priority: SlaPriority;
}
