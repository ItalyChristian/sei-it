import * as RadixSelect from "@radix-ui/react-select";

import { isGroup, SelectContentProps, type SelectOption } from "./select.types";
import * as styles from "./styles.css";

const renderOption = ({ label, value, disabled }: SelectOption) => (
  <RadixSelect.Item
    key={value}
    value={value}
    disabled={disabled}
    className={styles.selectItem}
  >
    <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
  </RadixSelect.Item>
);

export const SelectContent = ({ options }: SelectContentProps) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      className={styles.selectContent}
      position="popper"
      sideOffset={4}
    >
      <RadixSelect.Viewport className={styles.selectViewport}>
        {options.map((item, index) => {
          // Formato 2: grupo com `label` + `options`
          if (isGroup(item)) {
            return (
              <RadixSelect.Group key={item.label ?? index}>
                {item.label && (
                  <RadixSelect.Label className={styles.selectLabel}>
                    {item.label}
                  </RadixSelect.Label>
                )}
                {item.options.map(renderOption)}
              </RadixSelect.Group>
            );
          }

          // Formato 1: item simples `{ label, value }`
          return renderOption(item);
        })}
      </RadixSelect.Viewport>
    </RadixSelect.Content>
  </RadixSelect.Portal>
);

/**
 * SelectContent
 *
 * Renderiza o dropdown do Radix aceitando dois formatos de `options`:
 *
 * 1. Lista simples — cada item é um `{ label, value }`:
 *
 *    const slaStatusOptions = Object.values(SlaStatus).map((status) => ({
 *      label: statusLabel[status],
 *      value: status,
 *    }));
 *
 *    <Select.Content options={slaStatusOptions} />
 *
 *    Cada item é renderizado como `RadixSelect.Item` direto no Viewport,
 *    sem agrupamento.
 *
 * 2. Lista de grupos — cada item é um `{ label, options: [...] }`:
 *
 *    const userGroups = [
 *      {
 *        label: "Usuários",
 *        options: allUsers.map((user) => ({
 *          label: `${user.nome} (${user.perfil})`,
 *          value: user.id,
 *        })),
 *      },
 *    ];
 *
 *    <Select.Content options={userGroups} />
 *
 *    Cada grupo vira um `RadixSelect.Group` com um `RadixSelect.Label`
 *    (opcional) e os itens dentro.
 *
 * A distinção é feita por `isGroup`, que checa a presença da
 * propriedade `options`. Os dois formatos podem ser misturados no
 * mesmo array, se necessário.
 */
