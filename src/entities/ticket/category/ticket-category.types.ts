export enum TicketCategoryName {
  ACCESS_PASSWORD = "Acesso e senhas",
  EMAIL = "E-mail",
  VPN = "Rede e VPN",
  WORKSPACE = "Estação de trabalho",
  ERP = "ERP",
  CRM = "CRM",
  REPORTS = "Relatórios e BI",
  INTEGRATIONS = "Integrações",
}

export interface TicketCategory {
  id: string;
  nome: TicketCategoryName;
  grupo_id: string;
}
