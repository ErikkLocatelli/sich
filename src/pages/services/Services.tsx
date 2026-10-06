import { useState } from "react"
import { Navigate, Link } from "react-router-dom"

import useHead from "../../hooks/useHead"
import usePreviousRoute from "../../hooks/usePreviousRoute"

import SichText from "../../components/commons/SichText"
import Title from "../../components/commons/Title"
import Card from "../../components/commons/Card"
import { SlideToggle } from "../../components/form/SlideToggle"
import ServiceInfoCard from "../../components/pages/services/ServiceInfoCard"

import { Button } from "../../components/ui/button"

const Services = () => {
  useHead("Serviços", "Gerencie seus serviços na SICH")
  const previousRoute = usePreviousRoute()
  const [catalogFilter, setCatalogFilter] = useState(0)

  const services = [
    { id: 1, name: "Esmaltação", price: 50, duration: "1h", status: "active" },
    { id: 2, name: "Manicure", price: 30, duration: "45", status: "paused" },
    { id: 3, name: "Pedicure", price: 40, duration: "1h", status: "active" },
    { id: 4, name: "Alongamento", price: 80, duration: "1h30", status: "paused" },
  ] as const

  const filteredServices = services.filter((service) => {
    if (catalogFilter === 1) return service.status === "active"
    if (catalogFilter === 2) return service.status === "paused"
    return true
  })

  return (
    <div className={`w-full min-h-dvh px-6 ${previousRoute === '/' || previousRoute === '/schedule' ? 'animateRight' : 'animateLeft'}`}>
      <div className="mt-6">
        <Title text="Serviços e preços"/>
      </div>
      <Card className="mt-4 p-4">
        <span className="text-[15px] font-semibold">Desempenho</span>

        <div className="mt-4 flex flex-row items-center">
          <div className="flex flex-1 flex-col items-center">
            <SichText text="6" />
            <span className="text-[9px] text-(--label-text)">Serviços</span>
          </div>

          <div className="h-10 w-px bg-gray-300" />

          <div className="flex flex-1 flex-col items-center">
            <SichText text="R$ 128" />
            <span className="text-[9px] text-(--label-text)">Ticket Médio</span>
          </div>

          <div className="h-10 w-px bg-gray-300" />

          <div className="flex flex-1 flex-col items-center">
            <SichText text="1h32" />
            <span className="text-[9px] text-(--label-text)">Duração Média</span>
          </div>
        </div>
      </Card>

      <div className="flex justify-center mt-6">
        <Button className="text-[12px] font-semibold py-5 px-8 shadow-sich-button">
          <Link to="/services/new">+ Novo serviço</Link>
        </Button>
      </div>

      <Card className="mt-6 p-4">
        <div className="flex flex-row items-center gap-2">
          <span className="text-[15px] font-semibold">Catálogo ativo</span>
          <SlideToggle
            className="rounded-lg flex-1 bg-sich-surface"
            selectedIndex={catalogFilter}
            onSelectedIndexChange={setCatalogFilter}
            options={[
              { children: "Todos" },
              { children: "Ativos" },
              { children: "Inativos" },
            ]}
            aria-label="Filtrar catálogo"
          />
        </div>

        <p className="text-[11px] text-(--label-text) font-bold mt-3">SERVIÇOS</p>
        
        <div className="mt-4 flex flex-col gap-4">
          {filteredServices.map((service) => (
            <ServiceInfoCard
              key={service.id}
              name={service.name}
              price={service.price}
              duration={service.duration}
              status={service.status}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Services
