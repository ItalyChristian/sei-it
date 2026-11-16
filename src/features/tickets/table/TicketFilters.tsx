"use client";

import { SlaStatus } from "@/entities/sla/sla-status.types";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { statusOptions } from "./status-options-map";
import type { ResponsibleOption } from "./responsible-options";
import * as styles from "./manager-tickets-table.css";

interface TicketFiltersProps {
  search: string;
  responsibleId: string | null;
  status: SlaStatus | null;
  responsibleOptions: ResponsibleOption[];
  onSearchChange: (value: string) => void;
  onResponsibleChange: (value: string | null) => void;
  onStatusChange: (value: SlaStatus | null) => void;
}

export function TicketFilters({
  search,
  responsibleId,
  status,
  responsibleOptions,
  onSearchChange,
  onResponsibleChange,
  onStatusChange,
}: TicketFiltersProps) {
  return (
    <div className={styles.toolbar}>
      <InputText
        aria-label="Buscar chamados"
        className={styles.searchInput}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar chamados..."
        value={search}
      />
      <Dropdown
        aria-label="Filtrar por responsável"
        className={styles.filterDropdown}
        onChange={(event) => onResponsibleChange(event.value)}
        optionLabel="name"
        optionValue="id"
        options={responsibleOptions}
        placeholder="Todos os responsáveis"
        showClear
        value={responsibleId}
      />
      <Dropdown
        aria-label="Filtrar por status"
        className={styles.filterDropdown}
        onChange={(event) => onStatusChange(event.value)}
        options={statusOptions}
        optionLabel="label"
        optionValue="value"
        placeholder="Todos os status"
        showClear
        value={status}
      />
    </div>
  );
}
