"use client";

import { slaStatusOptions } from "@/entities/sla/sla-status-options-map";
import { Select, withAllOption } from "@/shared/components/Select";
import { InputText } from "primereact/inputtext";
import { TicketsTableFiltersProps } from "./filters.types";
import * as styles from "./tickets-table-filters.css";

export function TicketsTableFilters({
  search,
  responsibleId,
  status,
  responsibleOptions,
  onSearchChange,
  onResponsibleChange,
  onStatusChange,
}: TicketsTableFiltersProps) {
  const responsible = withAllOption(
    responsibleOptions.map((option) => ({
      label: option.name,
      value: option.id,
    })),
    { label: "Todos os responsáveis" },
  );

  const statusFilter = withAllOption(slaStatusOptions, {
    label: "Todos os status",
  });

  return (
    <div className={styles.toolbar}>
      <InputText
        aria-label="Buscar chamados"
        className={styles.searchInput}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar chamados..."
        value={search}
      />

      <Select.Root
        aria-label="Filtrar por responsável"
        value={responsible.toSelectValue(responsibleId)}
        onChange={(v) => onResponsibleChange(responsible.fromSelectValue(v))}
        placeholder="Todos os responsáveis"
        showClear={responsibleId !== null}
        onClear={() => onResponsibleChange(null)}
      >
        <Select.Content options={responsible.options} />
      </Select.Root>

      <Select.Root
        aria-label="Filtrar por status"
        value={statusFilter.toSelectValue(status)}
        onChange={(v) => onStatusChange(statusFilter.fromSelectValue(v))}
        placeholder="Todos os status"
        showClear={status !== null}
        onClear={() => onStatusChange(null)}
      >
        <Select.Content options={statusFilter.options} />
      </Select.Root>
    </div>
  );
}
