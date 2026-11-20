import { Message } from "@/entities/chat/message.types";
import dados from "@/mocks/dados.json";

/**
 * Gera mensagens fake para os primeiros N chamados.
 * Usado apenas para o mock — em produção, viria da API.
 */
function generateMockMessages(): Message[] {
  const messages: Message[] = [];
  const ticketsWithMessages = dados.chamados.slice(0, 10);

  ticketsWithMessages.forEach((ticket, index) => {
    const solicitante = dados.usuarios.find(
      (u) => u.id === ticket.solicitante_id,
    );
    const responsavel = dados.usuarios.find(
      (u) => u.id === ticket.responsavel_id,
    );

    // Mensagem 1: abertura do solicitante
    messages.push({
      id: `msg-${ticket.id}-1`,
      ticket_id: ticket.id,
      autor_id: ticket.solicitante_id,
      tipo: "public",
      conteudo: ticket.descricao,
      criado_em: ticket.aberto_em,
    });

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
    }

    // Mensagem 3: nota interna do responsável
    if (responsavel && index % 2 === 0) {
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
  });

  return messages;
}

export const messagesMockDb = {
  list: () => generateMockMessages(),
  listByTicket: (ticketId: string) =>
    generateMockMessages().filter((m) => m.ticket_id === ticketId),
};
