import dados from "@/mocks/dados.json";
import { useAuth } from "@/shared/contexts/session.context";
import { formatInTimeZone } from "date-fns-tz";

export function useReferenceDate() {
  const { user } = useAuth();
  const referenceDate = dados.meta.agora;

  return {
    iso: referenceDate,

    date: new Date(referenceDate),

    timezone: user?.zoneinfo ?? "America/Sao_Paulo",

    formatted: formatInTimeZone(
      new Date(referenceDate),
      user?.zoneinfo ?? "America/Sao_Paulo",
      "dd/MM/yyyy 'às' HH:mm",
    ),
  };
}
