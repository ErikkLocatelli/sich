import { History, Tag } from "lucide-react"

/** Shared copy of the financial page, so mobile and desktop never drift apart. */
export const FINANCIAL_COPY = {
  title: "Financeiro",
  subtitle: "Faturamento, extrato e desempenho dos seus atendimentos",
  heroLabel: (monthName: string) => `Faturamento líquido em ${monthName}`,
  heroAction: "Ver agenda",
  statementTitle: "Extrato do mês",
  statementEmptyTitle: "Nenhum atendimento concluído",
  statementEmptyDescription: "O faturamento de cada dia aparece aqui.",
  topProductsTitle: "Serviços que mais faturam",
  topProductsEmptyTitle: "Nenhum serviço faturado",
  topProductsEmptyDescription: "Seus serviços mais vendidos no mês aparecem aqui.",
  shortcutsTitle: "Atalhos",
  monthSummaryTitle: "Resumo do mês",
  monthToggleLabel: "Selecionar mês",
}

export const FINANCIAL_SHORTCUTS = [
  { label: "Histórico de atendimentos", description: "Concluídos e cancelados", icon: History, to: "/schedule/history" },
  { label: "Serviços e preços", description: "Ajuste o que você oferece", icon: Tag, to: "/products" },
]
