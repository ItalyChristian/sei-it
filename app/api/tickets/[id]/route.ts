import { SlaStatus } from "@/entities/sla/sla-status.types";
import { ticketMockDb } from "@/mocks/db/ticket.mock-db";
import { NextRequest, NextResponse } from "next/server";

interface TicketRouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: TicketRouteContext) {
  const { id } = await params;
  const body: unknown = await request.json();
  const ticket = ticketMockDb.find(id);

  if (!ticket) {
    return NextResponse.json({ error: "Chamado não encontrado." }, { status: 404 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("userId" in body) ||
    typeof body.userId !== "string"
  ) {
    return NextResponse.json({ error: "Usuário inválido." }, { status: 400 });
  }

  if ("responsibleId" in body) {
    if (typeof body.responsibleId !== "string" || ticket.responsavel_id) {
      return NextResponse.json(
        { error: "O chamado não está disponível para assumir." },
        { status: 409 },
      );
    }

    const assignedTicket = ticketMockDb.assign(id, body.responsibleId);
    if (!assignedTicket) {
      return NextResponse.json(
        { error: "Não foi possível assumir o chamado." },
        { status: 409 },
      );
    }
    return NextResponse.json(assignedTicket);
  }

  if (
    !("status" in body) ||
    !Object.values(SlaStatus).includes(body.status as SlaStatus) ||
    !("reason" in body) ||
    typeof body.reason !== "string" ||
    !body.reason.trim()
  ) {
    return NextResponse.json(
      { error: "Informe um status e o motivo da alteração." },
      { status: 400 },
    );
  }

  const updatedTicket = ticketMockDb.updateStatus(
    id,
    body.status as SlaStatus,
    body.reason.trim(),
    body.userId,
  );
  if (!updatedTicket) {
    return NextResponse.json(
      { error: "O chamado já está nesse status." },
      { status: 409 },
    );
  }
  return NextResponse.json(updatedTicket);
}
