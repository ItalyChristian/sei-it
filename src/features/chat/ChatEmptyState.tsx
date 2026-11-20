import { empty } from "./styles/message-list.css";

export const ChatEmptyState = () => {
  return <div className={empty}>Nenhuma mensagem ainda. Envie a primeira!</div>;
};
