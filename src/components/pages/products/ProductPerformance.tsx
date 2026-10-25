import SubTitle from "@/components/commons/SubTitle"
import Card from "@/components/commons/Card"
import StatsSummary from "@/components/commons/StatsSummary"


const ProductPerformance = ( {products }: { products: { durationMinutes: number; price: number }[] }) => {

  const avarageDuration = () => {
    const totalDuration = products.reduce((acc, product) => acc + product.durationMinutes, 0) / products.length
    const hours = Math.floor(totalDuration / 60)
    const minutes = (totalDuration % 60).toFixed(0)
    return `${hours}h${minutes}`
  }

  const averageTicket = () => {
    const totalTicket = products.reduce((acc, product) => acc + product.price, 0) / products.length
    return `R$ ${totalTicket.toFixed(0)}`
  }

  return (
    <Card className="mt-4 p-4">
      <SubTitle text="Desempenho" />

      <StatsSummary
        items={[
          { value: products.length.toLocaleString(), label: "Serviços" },
          { value: averageTicket(), label: "Ticket Médio" },
          { value: avarageDuration(), label: "Duração Média" },
        ]}
      />
    </Card>
  )
}

export default ProductPerformance
