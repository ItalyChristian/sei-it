"use client";

import { slaStatusOptions } from "@/entities/sla/sla-status-options-map";
import { SlaPriority } from "@/entities/sla/sla-priority.types";
import { priorityLabels } from "@/entities/sla/sla-priority-map";
import { TicketSlaFilterValue } from "@/entities/sla/ticket-sla";
import { Select, withAllOption } from "@/shared/components/Select";
import { InputText } from "primereact/inputtext";
import { TicketsTableFiltersProps } from "./filters.types";
import * as styles from "./tickets-table-filters.css";

export function TicketsTableFilters({
  search,
  responsibleId,
  status,
  slaFilter,
  priority,
  responsibleOptions,
  onSearchChange,
  onResponsibleChange,
  onStatusChange,
  onSlaFilterChange,
  onPriorityChange,
  showResponsibleFilter,
  showAllResponsibleOption,
  showPriorityFilter,
}: TicketsTableFiltersProps) {
  const unassignedValue = "__unassigned__";
  const optionValues = responsibleOptions.map((option) => ({
    label: option.name,
    value: option.id || unassignedValue,
  }));
  const responsible = withAllOption(optionValues, {
    label: "Todos os responsáveis",
  });
  const responsibleValue =
    responsibleId === ""
      ? unassignedValue
      : showAllResponsibleOption
        ? responsible.toSelectValue(responsibleId)
        : (responsibleId ?? unassignedValue);

  const statusFilter = withAllOption(slaStatusOptions, {
    label: "Todos os status",
  });
  const slaOptions = withAllOption<TicketSlaFilterValue>(
    [
      { label: "No prazo", value: "on-track" },
      { label: "Em risco", value: "at-risk" },
      { label: "Excedido", value: "overdue" },
      { label: "Cumprido", value: "completed" },
      { label: "Prazo indisponível", value: "unknown" },
    ],
    { label: "Todos os SLAs" },
  );
  const priorityOptions = withAllOption(
    Object.values(SlaPriority).map((value) => ({
      label: priorityLabels[value],
      value,
    })),
    { label: "Todas as prioridades" },
  );

  return (
    <div className={styles.toolbar}>
      <InputText
        aria-label="Buscar chamados"
        className={styles.searchInput}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Buscar chamados..."
        value={search}
      />

      {showResponsibleFilter && (
        <Select.Root
          ariaLabel="Filtrar por responsável"
          value={responsibleValue}
          onChange={(value) => {
            if (value === unassignedValue) {
              onResponsibleChange("");
            } else if (showAllResponsibleOption) {
              onResponsibleChange(responsible.fromSelectValue(value));
            } else {
              onResponsibleChange(value);
            }
          }}
          placeholder="Todos os responsáveis"
          showClear={showAllResponsibleOption && responsibleId !== null}
          onClear={() => onResponsibleChange(null)}
        >
          <Select.Content
            options={
              showAllResponsibleOption ? responsible.options : optionValues
            }
          />
        </Select.Root>
      )}

      <Select.Root
        ariaLabel="Filtrar por status"
        value={statusFilter.toSelectValue(status)}
        onChange={(v) => onStatusChange(statusFilter.fromSelectValue(v))}
        placeholder="Todos os status"
        showClear={status !== null}
        onClear={() => onStatusChange(null)}
      >
        <Select.Content options={statusFilter.options} />
      </Select.Root>

      <Select.Root
        ariaLabel="Filtrar por SLA"
        value={slaOptions.toSelectValue(slaFilter)}
        onChange={(value) =>
          onSlaFilterChange(slaOptions.fromSelectValue(value))
        }
        placeholder="Todos os SLAs"
        showClear={slaFilter !== null}
        onClear={() => onSlaFilterChange(null)}
      >
        <Select.Content options={slaOptions.options} />
      </Select.Root>

      {showPriorityFilter && (
        <Select.Root
          ariaLabel="Filtrar por prioridade"
          value={priorityOptions.toSelectValue(priority)}
          onChange={(value) =>
            onPriorityChange(priorityOptions.fromSelectValue(value))
          }
          placeholder="Todas as prioridades"
          showClear={priority !== null}
          onClear={() => onPriorityChange(null)}
        >
          <Select.Content options={priorityOptions.options} />
        </Select.Root>
      )}
    </div>
  );
}
