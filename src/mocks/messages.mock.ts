import { Message } from "@/entities/chat/message.types";
import dados from "@/mocks/dados.json";

/**
 * Gera mensagens fake para os primeiros N chamados.
 * Usado apenas para o mock — em produção, viria da API.
 */

// Cache em memória para persistir mensagens novas
let inMemoryMessages: Message[] | null = null;

function generateInitialMessages(): Message[] {
  if (inMemoryMessages) return inMemoryMessages;

  const messages: Message[] = [];

  dados.chamados.forEach((ticket) => {
    // Mensagem 1: abertura do solicitante. A primeira mensagem é a descrição (prévia) do ticket
    messages.push({
      id: `msg-${ticket.id}-1`,
      ticket_id: ticket.id,
      autor_id: ticket.solicitante_id,
      tipo: "public",
      conteudo: ticket.descricao,
      criado_em: ticket.aberto_em,
    });
  });

  //  Adiciona respostas e notas apenas para os 10 primeiros
  const ticketsWithReplies = dados.chamados.slice(0, 10);

  ticketsWithReplies.forEach((ticket, index) => {
    const responsavel = dados.usuarios.find(
      (u) => u.id === ticket.responsavel_id,
    );

    // Mensagem 2: resposta do responsável
    if (responsavel) {
      const responseTime = new Date(
        new Date(ticket.aberto_em).getTime() + 60 * 60 * 1000,
      ).toISOString();

      messages.push({
        id: `msg-${ticket.id}-2`,
        ticket_id: ticket.id,
        autor_id: responsavel.id,
        tipo: "public",
        conteudo:
          "Olá! Estou analisando o caso. Vou retornar em breve com uma atualização.",
        criado_em: responseTime,
      });

      // Mensagem 3: nota interna do responsável
      if (index % 2 === 0) {
        const noteTime = new Date(
          new Date(ticket.aberto_em).getTime() + 2 * 60 * 60 * 1000,
        ).toISOString();
        messages.push({
          id: `msg-${ticket.id}-3`,
          ticket_id: ticket.id,
          autor_id: responsavel.id,
          tipo: "internal",
          conteudo:
            "Verifiquei os logs do servidor. O erro parece estar relacionado à configuração do firewall.",
          criado_em: noteTime,
        });
      }
    }
  });

  inMemoryMessages = messages.sort(
    (a, b) => new Date(a.criado_em).getTime() - new Date(b.criado_em).getTime(),
  );

  return inMemoryMessages;
}

export const messagesMockDb = {
  listByTicket: (ticketId: string) => {
    return generateInitialMessages().filter((m) => m.ticket_id === ticketId);
  },

  add: (message: Message) => {
    generateInitialMessages();
    inMemoryMessages!.push(message);
    return message;
  },
};
