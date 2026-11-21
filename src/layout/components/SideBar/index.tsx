import { btnPrimary } from "@/shared/styles/components/buttons.css";
import { Button } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import Link from "next/link";
import * as styles from "./styles.css";

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

      <Link href="/chat" className={styles.queueLink}>
        Pesquisar e atender chamados
      </Link>
    </aside>
  );
};
