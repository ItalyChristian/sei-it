"use client";

import { SlaStatus } from "@/entities/sla/sla-status.types";
import { statusLabel } from "@/entities/ticket/ticket-status-map";
import { useUpdateTicketStatus } from "@/entities/ticket/useTickets";
import { UserRole } from "@/entities/user/user-roles.enum";
import { useAuth } from "@/shared/contexts/session.context";
import { Select } from "@/shared/components/Select";
import { Button, TextField } from "@radix-ui/themes";
import { FormEvent, useState } from "react";
import * as styles from "./ticket-status-control.css";

interface TicketStatusControlProps {
  ticketId: string;
  status: SlaStatus;
}

export function TicketStatusControl({
  ticketId,
  status: currentStatus,
}: TicketStatusControlProps) {
  const { user } = useAuth();
  const [status, setStatus] = useState(currentStatus);
  const [reason, setReason] = useState("");
  const mutation = useUpdateTicketStatus(ticketId);

  if (!user || user.perfil === UserRole.CLIENT) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(
      {
        status,
        reason: reason.trim(),
        userId: user.id,
        previousStatus: currentStatus,
      },
      { onSuccess: () => setReason("") },
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <span className={styles.label}>Alterar status</span>
      <Select.Root
        ariaLabel="Alterar status"
        className={styles.select}
        onChange={(value) => {
          const selected = Object.values(SlaStatus).find(
            (statusOption) => statusOption === value,
          );
          if (selected) setStatus(selected);
        }}
        value={status}
      >
        <Select.Content
          options={Object.values(SlaStatus).map((value) => ({
            label: statusLabel[value],
            value,
          }))}
        />
      </Select.Root>
      <TextField.Root
        aria-label="Motivo da alteração do status"
        className={styles.reason}
        onChange={(event) => setReason(event.target.value)}
        placeholder="Motivo obrigatório"
        value={reason}
      />
      <Button
        className={styles.submit}
        disabled={
          mutation.isPending || !reason.trim() || status === currentStatus
        }
        type="submit"
      >
        {mutation.isPending ? "Salvando..." : "Salvar"}
      </Button>
      {mutation.isError && (
        <span className={styles.error} role="alert">
          Não foi possível atualizar o status. Tente novamente.
        </span>
      )}
    </form>
  );
}
