import { UserLocale } from "./user-locale.types";
import { UserRole } from "./user-roles.types";

export interface User {
  id: string;
  nome: string;
  email: string;
  perfil: UserRole;
  locale: UserLocale;
  zoneinfo: string;
  empresa: string;
}
