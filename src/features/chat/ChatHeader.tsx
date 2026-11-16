import { Button } from "@radix-ui/themes";
import { Clock, Info, User } from "lucide-react";
import * as styles from "./chat-header.css";

export const ChatHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Erro ao gerar relatório financeiro</h1>

        <div className={styles.actions}>
          <Button variant="outline">Mudar Status</Button>
          <Button>Assumir Chamado</Button>
        </div>
      </div>

      <div className={styles.info}>
        <span className={styles.infoItem}>
          <Info size={18} />
          ID: #TK-1042
        </span>

        <span className={styles.infoItem}>
          <Clock size={18} />
          Prazo: Hoje, 18:00
        </span>

        <span className={styles.infoItem}>
          <User size={18} />
          Atendente: Você
        </span>
      </div>
    </div>
  );
};
