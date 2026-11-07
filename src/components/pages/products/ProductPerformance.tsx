import SubTitle from "@/components/commons/SubTitle"
import Card from "@/components/commons/Card"
import StatsSummary from "@/components/commons/StatsSummary"
import { cn } from "@/lib/utils"
import { averageDurationLabel, averageTicketLabel } from "@/services/product/productStats"

type ProductPerformanceProps = {
  products: { durationMinutes: number; price: number }[]
  className?: string
}

const ProductPerformance = ({ products, className }: ProductPerformanceProps) => {
  return (
    <Card className={cn("mt-4 p-4", className)}>
      <SubTitle text="Desempenho" />

      <StatsSummary
        items={[
          { value: products.length.toLocaleString(), label: "Serviços" },
          { value: averageTicketLabel(products), label: "Ticket Médio" },
          { value: averageDurationLabel(products), label: "Duração Média" },
        ]}
      />
    </Card>
  )
}

export default ProductPerformance
