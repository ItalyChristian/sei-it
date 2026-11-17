import { UserLocale, UserZoneInfo } from "./user-locale.enum";
import { UserRole } from "./user-roles.enum";

export interface User {
  id: string;
  nome: string;
  email: string;
  perfil: UserRole;
  locale: UserLocale;
  zoneinfo: UserZoneInfo | string;

  empresa?: string;
  grupo_id?: string;
  grupos_ids?: string[];
  avatarUrl?: string;
}

export type UserSummary = Pick<User, "id" | "nome" | "perfil">;
