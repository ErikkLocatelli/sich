import SichText from "@/components/commons/SichText"
import SubTitle from "@/components/commons/SubTitle"
import Card from "@/components/commons/Card"



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

      <div className="mt-4 flex flex-row items-center">
        <div className="flex flex-1 flex-col items-center">
          <SichText text={products.length.toLocaleString()} />
          <span className="text-[9px] text-(--label-text)">Serviços</span>
        </div>

        <div className="h-10 w-px bg-gray-300" />

        <div className="flex flex-1 flex-col items-center">
          <SichText text={averageTicket()} />
          <span className="text-[9px] text-(--label-text)">Ticket Médio</span>
        </div>

        <div className="h-10 w-px bg-gray-300" />

        <div className="flex flex-1 flex-col items-center">
          <SichText text={avarageDuration()} />
          <span className="text-[9px] text-(--label-text)">Duração Média</span>
        </div>
      </div>
    </Card>
  )
}

export default ProductPerformance
