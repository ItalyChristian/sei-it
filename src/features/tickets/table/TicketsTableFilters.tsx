"use client";

import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { TicketsTableFiltersProps } from "./filters.types";
import { statusOptions } from "./status-options-map";
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
        onChange={(event) => onResponsibleChange(event.value ?? null)}
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
        onChange={(event) => onStatusChange(event.value ?? null)}
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
