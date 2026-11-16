"use client";

import { priorityLabels } from "@/entities/sla/sla-priority.types";
import { SlaStatus } from "@/entities/sla/sla-status.types";
import type { TicketCategory } from "@/entities/ticket/category/ticket-category.types";
import { statusBadge, statusLabel } from "@/entities/ticket/ticket-status-map";
import type { Ticket } from "@/entities/ticket/ticket.types";
import type { UserSummary } from "@/entities/user/user.types";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useMemo, useState } from "react";
import * as styles from "./manager-tickets-table.css";
import { getResponsibleOptions } from "./responsible-options";
import { ticketSla } from "./SlaColumnBody";
import { TicketFilters } from "./TicketFilters";
import { TicketTitle } from "./TicketTitle";

interface FilteredTicketsProps {
  tickets: Ticket[];
  users: UserSummary[];
  categories: TicketCategory[];
  referenceDate: string;
  isLoading: boolean;
}

export function FilteredTickets({
  tickets,
  users,
  categories,
  referenceDate,
  isLoading,
}: FilteredTicketsProps) {
  const [search, setSearch] = useState("");
  const [responsibleId, setResponsibleId] = useState<string | null>(null);
  const [status, setStatus] = useState<SlaStatus | null>(null);
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
    () => getResponsibleOptions(users),
    [users],
  );

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("pt-BR");

    return tickets.filter((ticket) => {
      const responsibleName =
        userNames.get(ticket.responsavel_id ?? "") ?? "Não atribuído";
      const categoryName =
        categoryNames.get(ticket.categoria_id) ?? "Sem categoria";
      const searchableText = [
        ticket.numero,
        ticket.titulo,
        responsibleName,
        categoryName,
        priorityLabels[ticket.prioridade],
        statusLabel[ticket.status],
      ]
        .join(" ")
        .toLocaleLowerCase("pt-BR");

      return (
        (!query || searchableText.includes(query)) &&
        (responsibleId === null ||
          (ticket.responsavel_id ?? "") === responsibleId) &&
        (status === null || ticket.status === status)
      );
    });
  }, [tickets, search, responsibleId, status, userNames, categoryNames]);

  return (
    <>
      <TicketFilters
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
        responsibleId={responsibleId}
        responsibleOptions={responsibleOptions}
        search={search}
        status={status}
      />

      <DataTable
        className={styles.dataTable}
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} chamados"
        dataKey="id"
        emptyMessage="Nenhum chamado encontrado."
        first={first}
        loading={isLoading}
        onPage={(event) => setFirst(event.first)}
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        rows={10}
        rowsPerPageOptions={[10, 25, 50]}
        size="small"
        value={filteredTickets}
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
              ticket={ticket}
            />
          )}
          sortable
        />
        <Column
          field="responsavel_id"
          header="Responsável"
          body={(ticket: Ticket) =>
            userNames.get(ticket.responsavel_id ?? "") ?? "Não atribuído"
          }
        />
        <Column
          field="prioridade"
          header="Prioridade"
          body={(ticket: Ticket) => (
            <span
              className={`${styles.priorityBadge} ${styles.priorityVariants[ticket.prioridade]}`}
            >
              {priorityLabels[ticket.prioridade]}
            </span>
          )}
          sortable
        />
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
          body={(ticket: Ticket) => ticketSla(ticket, referenceDate)}
        />
      </DataTable>
    </>
  );
}
