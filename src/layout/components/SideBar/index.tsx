import {
  ticketClosed,
  ticketOpen,
  ticketProgress,
} from "@/entities/ticket/styles/ticket-state-badge.css";
import { btnPrimary } from "@/shared/styles/components/buttons.css";
import { Button } from "@radix-ui/themes";
import clsx from "clsx";
import { Plus } from "lucide-react";
import * as styles from "./styles.css";
import * as ticket from "./ticket.css";

export const SideBar = () => {
  return (
    <aside className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.h2}>Chamados</h2>

        <Button
          className={btnPrimary}
          style={{
            width: "100%",
            paddingBlock: "1.2rem",
            fontSize: "1rem",
          }}
        >
          <Plus size={15} /> Abrir Chamado
        </Button>
      </div>

      <div className={ticket.list}>
        <div className={clsx(ticket.item, ticket.active)}>
          <div className={ticket.meta}>
            <span className={ticket.id}>#TK-1042</span>
            <span className={ticketProgress}>Em Atendimento</span>
          </div>

          <div className={ticket.title}>Erro ao gerar relatório financeiro</div>
          <div className={ticket.snippet}>
            O usuário relata que ao clicar em exportar...
          </div>
        </div>

        <div className={ticket.item}>
          <div className={ticket.meta}>
            <span className={ticket.id}>#TK-1041</span>
            <span className={ticketOpen}>Aberto</span>
          </div>
          <div className={ticket.title}>Acesso negado ao módulo de vendas</div>
          <div className={ticket.snippet}>
            Preciso de permissão para visualizar o funil...
          </div>
        </div>
        <div className={ticket.item}>
          <div className={ticket.meta}>
            <span className={ticket.id}>#TK-1039</span>
            <span className={ticketClosed}>Fechado</span>
          </div>
          <div className={ticket.title}>Dúvida sobre integração com API</div>
          <div className={ticket.snippet}>
            Qual é o endpoint para sincronizar os dados?
          </div>
        </div>
      </div>
    </aside>
  );
};
