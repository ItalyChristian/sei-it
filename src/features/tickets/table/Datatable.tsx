"use client";

import { priorityLabels } from "@/entities/sla/sla-priority.types";
import { SlaStatus } from "@/entities/sla/sla-status.types";
import type { Ticket } from "@/entities/ticket/ticket.types";
import { useTickets } from "@/entities/ticket/useTickets";
import dados from "@/mocks/dados.json";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useMemo, useState } from "react";
import {
  statusBadge,
  statusLabel,
} from "../../../entities/ticket/ticket-status-map";
import * as styles from "./manager-tickets-table.css";
import { statusOptions } from "./status-options-map";

const hourInMs = 60 * 60 * 1000;

const responsibleOptions = [
  { id: "", name: "Não atribuído" },
  ...dados.usuarios.map((user) => ({ id: user.id, name: user.nome })),
];

function getResponsibleName(responsibleId?: string) {
  return (
    dados.usuarios.find((user) => user.id === responsibleId)?.nome ??
    "Não atribuído"
  );
}

function getCategoryName(categoryId: string) {
  return (
    dados.categorias.find((category) => category.id === categoryId)?.nome ??
    "Sem categoria"
  );
}

function ticketTitle(ticket: Ticket) {
  return (
    <div className={styles.ticketCell}>
      <span className={styles.ticketTitle}>{ticket.titulo}</span>
      <span className={styles.ticketCategory}>
        Categoria: {getCategoryName(ticket.categoria_id)}
      </span>
    </div>
  );
}

function ticketSla(ticket: Ticket) {
  const resolvedAt = ticket.resolvido_em ?? ticket.fechado_em;
  const referenceDate = Date.parse(resolvedAt ?? dados.meta.agora);
  const remaining = Date.parse(ticket.prazo_resolucao) - referenceDate;
  const isOverdue = remaining < 0;
  const isAtRisk = !resolvedAt && remaining < 2 * hourInMs;
  const variant = isOverdue
    ? styles.slaVariants.overdue
    : isAtRisk
      ? styles.slaVariants.risk
      : styles.slaVariants.ok;

  let label = "Cumprido";
  if (!resolvedAt && remaining >= 2 * hourInMs) {
    label = `${Math.floor(remaining / hourInMs)}h`;
  } else if (!resolvedAt && remaining >= 0) {
    const hours = Math.floor(remaining / hourInMs);
    const minutes = Math.floor((remaining % hourInMs) / 60000);
    label = `${hours}h ${minutes}m`;
  } else if (isOverdue) {
    label = "Estourado";
  }

  return <span className={`${styles.slaBadge} ${variant}`}>{label}</span>;
}

export function ManagerTicketsTable() {
  const { data: tickets = [], isLoading, isError } = useTickets();
  const [search, setSearch] = useState("");
  const [responsibleId, setResponsibleId] = useState<string | null>(null);
  const [status, setStatus] = useState<SlaStatus | null>(null);
  const [first, setFirst] = useState(0);

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("pt-BR");

    return tickets.filter((ticket) => {
      const searchableText = [
        ticket.numero,
        ticket.titulo,
        getResponsibleName(ticket.responsavel_id),
        getCategoryName(ticket.categoria_id),
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
  }, [tickets, search, responsibleId, status]);

  if (isError) {
    return (
      <p className={styles.errorState} role="alert">
        Não foi possível carregar os chamados.
      </p>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.heading}>
        <h1 className={styles.title}>Chamados da equipe</h1>
        <p className={styles.description}>
          Acompanhe os chamados e seus prazos de atendimento.
        </p>
      </header>

      <div className={styles.toolbar}>
        <InputText
          aria-label="Buscar chamados"
          className={styles.searchInput}
          onChange={(event) => {
            setSearch(event.target.value);
            setFirst(0);
          }}
          placeholder="Buscar chamados..."
          value={search}
        />
        <Dropdown
          aria-label="Filtrar por responsável"
          className={styles.filterDropdown}
          onChange={(event) => {
            setResponsibleId(event.value);
            setFirst(0);
          }}
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
          onChange={(event) => {
            setStatus(event.value);
            setFirst(0);
          }}
          options={statusOptions}
          optionLabel="label"
          optionValue="value"
          placeholder="Todos os status"
          showClear
          value={status}
        />
      </div>

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
        <Column field="titulo" header="Chamado" body={ticketTitle} sortable />
        <Column
          field="responsavel_id"
          header="Responsável"
          body={(ticket: Ticket) => getResponsibleName(ticket.responsavel_id)}
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
        <Column field="prazo_resolucao" header="SLA" body={ticketSla} />
      </DataTable>
    </main>
  );
}
