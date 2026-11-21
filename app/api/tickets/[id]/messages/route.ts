import { Message, MessageType } from "@/entities/chat/message.types";
import { ticketMockDb } from "@/mocks/db/ticket.mock-db";
import { messagesMockDb } from "@/mocks/messages.mock";
import { NextRequest, NextResponse } from "next/server";

interface MessagesRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: MessagesRouteContext) {
  const { id } = await params;
  if (!ticketMockDb.find(id)) {
    return NextResponse.json({ error: "Chamado não encontrado." }, { status: 404 });
  }
  return NextResponse.json(messagesMockDb.listByTicket(id));
}

export async function POST(request: NextRequest, { params }: MessagesRouteContext) {
  const { id } = await params;
  const body: unknown = await request.json();
  if (!ticketMockDb.find(id)) {
    return NextResponse.json({ error: "Chamado não encontrado." }, { status: 404 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("content" in body) ||
    typeof body.content !== "string" ||
    !body.content.trim() ||
    !("authorId" in body) ||
    typeof body.authorId !== "string" ||
    !("type" in body) ||
    (body.type !== "public" && body.type !== "internal")
  ) {
    return NextResponse.json({ error: "Dados da mensagem inválidos." }, { status: 400 });
  }

  const message: Message = {
    id: `msg-${crypto.randomUUID()}`,
    ticket_id: id,
    autor_id: body.authorId,
    tipo: body.type as MessageType,
    conteudo: body.content.trim(),
    criado_em: new Date().toISOString(),
  };
  messagesMockDb.add(message);
  return NextResponse.json(message, { status: 201 });
}
