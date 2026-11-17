import { UserSummary } from "@/entities/user/user.types";
import dados from "@/mocks/dados.json";

const users = dados.usuarios.map(({ id, nome }) => ({
  id,
  nome,
})) as UserSummary[];

export const userMockDb = {
  list: () => users,
};
