"use client";

import { priorityBadge, priorityLabels } from "@/entities/sla/sla-priority-map";
import { SlaPriority } from "@/entities/sla/sla-priority.types";
import { SlaStatus } from "@/entities/sla/sla-status.types";
import {
  evaluateTicketSla,
  formatSlaDuration,
  TicketSlaFilterValue,
} from "@/entities/sla/ticket-sla";
import { statusBadge, statusLabel } from "@/entities/ticket/ticket-status-map";
import type { Ticket } from "@/entities/ticket/ticket.types";
import { EmptyState } from "@/shared/components/EmptyState";
import { LoadingState } from "@/shared/components/LoadingState";
import { dataTable } from "@/shared/styles/components/datatable.css";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useMemo, useState } from "react";
import { getResponsibleOptions } from "./responsible-options";
import { SlaColumnBody } from "./SlaColumnBody";
import { TicketsTableProps } from "./table.types";
import * as styles from "./tickets-table.css";
import { TicketsTableFilters } from "./TicketsTableFilters";
import { TicketTitle } from "./TicketTitle";

export function TicketsTable({
  tickets,
  users,
  categories,
  referenceDate,
  isLoading,
  variant,
  currentUserId,
}: TicketsTableProps) {
  const [search, setSearch] = useState("");
  const [responsibleId, setResponsibleId] = useState<string | null>(() =>
    variant === "operator" ? (currentUserId ?? "") : null,
  );
  const [status, setStatus] = useState<SlaStatus | null>(null);
  const [slaFilter, setSlaFilter] = useState<TicketSlaFilterValue | null>(null);
  const [priority, setPriority] = useState<SlaPriority | null>(null);
  const [first, setFirst] = useState(0);

  const userNames = useMemo(
    () => new Map(users.map((user) => [user.id, user.nome])),
    [users],
  );

  const categoryNames = useMemo(
    () => new Map(categories.map((category) => [category.id, category.nome])),
    [categories],
  );

  const responsibleOptions = useMemo(
    () => {
      const options = getResponsibleOptions(users);
      return variant === "operator"
        ? options.filter(
            (option) => option.id === "" || option.id === currentUserId,
          )
        : options;
    },
    [users, variant, currentUserId],
  );

  const TicketsTable = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("pt-BR");

    return tickets.filter((ticket) => {
      const responsibleName =
        userNames.get(ticket.responsavel_id ?? "") ?? "Não atribuído";
      const categoryName =
        categoryNames.get(ticket.categoria_id) ?? "Sem categoria";
      const sla = evaluateTicketSla(ticket, referenceDate);
      const slaText = [
        sla.label,
        sla.durationMs === null ? "" : formatSlaDuration(sla.durationMs),
      ].join(" ");
      const searchableText = [
        ticket.numero,
        ticket.titulo,
        responsibleName,
        statusLabel[ticket.status],
        slaText,
        ...(variant === "client"
          ? []
          : [categoryName, priorityLabels[ticket.prioridade]]),
      ]
        .join(" ")
        .toLocaleLowerCase("pt-BR");
      const matchesResponsible =
        responsibleId === null
          ? true
          : variant === "operator" && responsibleId === currentUserId
            ? ticket.responsavel_id === currentUserId || !ticket.responsavel_id
            : (ticket.responsavel_id ?? "") === responsibleId;

      return (
        (!query || searchableText.includes(query)) &&
        matchesResponsible &&
        (status === null || ticket.status === status) &&
        (priority === null || ticket.prioridade === priority) &&
        (slaFilter === null ||
          sla.filterValue === slaFilter)
      );
    });
  }, [
    tickets,
    search,
    responsibleId,
    status,
    priority,
    slaFilter,
    userNames,
    categoryNames,
    referenceDate,
    variant,
    currentUserId,
  ]);

  return (
    <>
      <TicketsTableFilters
        onResponsibleChange={(value) => {
          setResponsibleId(value);
          setFirst(0);
        }}
        onSearchChange={(value) => {
          setSearch(value);
          setFirst(0);
        }}
        onStatusChange={(value) => {
          setStatus(value);
          setFirst(0);
        }}
        onSlaFilterChange={(value) => {
          setSlaFilter(value);
          setFirst(0);
        }}
        onPriorityChange={(value) => {
          setPriority(value);
          setFirst(0);
        }}
        responsibleId={responsibleId}
        responsibleOptions={responsibleOptions}
        search={search}
        status={status}
        slaFilter={slaFilter}
        priority={priority}
        showResponsibleFilter={variant !== "client"}
        showAllResponsibleOption={variant !== "operator"}
        showPriorityFilter={variant === "operator"}
      />

      <DataTable
        className={dataTable}
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} chamados"
        dataKey="id"
        emptyMessage={
          <EmptyState description="Nenhum chamado encontrado." />
        }
        first={first}
        loading={isLoading}
        loadingIcon={
          <LoadingState
            centered={false}
            label="Carregando chamados..."
            size="sm"
          />
        }
        onPage={(event) => setFirst(event.first)}
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        size="small"
        value={TicketsTable}
      >
        <Column
          field="numero"
          header="ID"
          body={(ticket: Ticket) => (
            <span className={styles.ticketNumber}>#{ticket.numero}</span>
          )}
          sortable
        />
        <Column
          field="titulo"
          header="Chamado"
          body={(ticket: Ticket) => (
            <TicketTitle
              categoryName={
                categoryNames.get(ticket.categoria_id) ?? "Sem categoria"
              }
              showCategory={variant !== "client"}
              ticket={ticket}
            />
          )}
          sortable
        />
        <Column
          field="responsavel_id"
          header={variant === "client" ? "Atendente" : "Responsável"}
          body={(ticket: Ticket) => {
            const responsible =
              userNames.get(ticket.responsavel_id ?? "");
            if (variant === "client") {
              return responsible ?? "Aguardando atendimento";
            }
            return responsible ?? "Não atribuído";
          }}
        />
        {variant !== "client" && (
          <Column
            field="prioridade"
            header="Prioridade"
            body={(ticket: Ticket) => (
              <span className={priorityBadge[ticket.prioridade]}>
                {priorityLabels[ticket.prioridade]}
              </span>
            )}
            sortable
          />
        )}

        <Column
          field="status"
          header="Status"
          body={(ticket: Ticket) => (
            <span className={statusBadge[ticket.status]}>
              {statusLabel[ticket.status]}
            </span>
          )}
          sortable
        />
        <Column
          field="prazo_resolucao"
          header="SLA"
          body={(ticket: Ticket) => SlaColumnBody(ticket, referenceDate)}
        />
      </DataTable>
    </>
  );
}
