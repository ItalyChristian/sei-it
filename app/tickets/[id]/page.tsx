import { TicketDetail } from "@/features/tickets/components/TicketDetail";
import { use } from "react";

interface TicketDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TicketDetailPage({ params }: TicketDetailPageProps) {
  const { id } = use(params);

  return <TicketDetail id={id} />;
}
