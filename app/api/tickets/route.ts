import { ticketMockDb } from "@/mocks/db/ticket.mock-db";
import { categoryMockDb } from "@/mocks/db/category.mock-db";
import { userMockDb } from "@/mocks/db/user.mock-db";
import { messagesMockDb } from "@/mocks/messages.mock";
import { Message } from "@/entities/chat/message.types";
import { UserRole } from "@/entities/user/user-roles.enum";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(ticketMockDb.list());
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();
  if (
    typeof body !== "object" ||
    body === null ||
    !("title" in body) ||
    typeof body.title !== "string" ||
    !body.title.trim() ||
    !("description" in body) ||
    typeof body.description !== "string" ||
    !body.description.trim() ||
    !("categoryId" in body) ||
    typeof body.categoryId !== "string" ||
    !("requesterId" in body) ||
    typeof body.requesterId !== "string"
  ) {
    return NextResponse.json(
      { error: "Preencha o título, a categoria e a descrição do chamado." },
      { status: 400 },
    );
  }

  const requester = userMockDb
    .list()
    .find((user) => user.id === body.requesterId);
  if (!requester || requester.perfil !== UserRole.CLIENT) {
    return NextResponse.json(
      { error: "Somente clientes podem abrir chamados." },
      { status: 403 },
    );
  }

  const category = categoryMockDb
    .list()
    .find((item) => item.id === body.categoryId);
  if (!category) {
    return NextResponse.json(
      { error: "Selecione uma categoria válida." },
      { status: 400 },
    );
  }

  const ticket = ticketMockDb.create({
    title: body.title.trim(),
    description: body.description.trim(),
    categoryId: category.id,
    groupId: category.grupo_id,
    requesterId: requester.id,
  });
  const initialMessage: Message = {
    id: `msg-${crypto.randomUUID()}`,
    ticket_id: ticket.id,
    autor_id: ticket.solicitante_id,
    tipo: "public",
    conteudo: ticket.descricao,
    criado_em: ticket.aberto_em,
  };
  messagesMockDb.add(initialMessage);

  return NextResponse.json(ticket, { status: 201 });
}
