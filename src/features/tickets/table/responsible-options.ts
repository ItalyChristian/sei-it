import { UserSummary } from "@/entities/user/user.types";

export interface ResponsibleOption {
  id: string;
  name: string;
}

export function getResponsibleOptions(users: UserSummary[]) {
  return [
    { id: "", name: "Não atribuído" },
    ...users.map((user) => ({ id: user.id, name: user.nome })),
  ];
}
