import useHead from "../../hooks/useHead"

import Title from "../../components/commons/Title"
import Input from "../../components/form/Input"
import ProfessionalInfoCard from "../../components/commons/ProfessionalInfoCard"

import { Field } from "../../components/ui/field"
import { Button } from "../../components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { Cog, Diamond } from 'lucide-react';

const Search = () => {
  useHead("Buscar", "Busque serviços ou profissionais na SICH")

  return (
    <div className="w-full min-h-dvh">
      <div className="px-6 py-4 flex flex-col bg-white gap-3">
        <Title text="Buscar" color="text-black" />
        <Field orientation="horizontal">
            <Input type="text" placeholder="Buscar serviços ou profissional" className="bg-sich-surface" />
            <Button size="icon-lg">
                <Cog className="size-4" />
            </Button>
        </Field>

        <ToggleGroup multiple variant="outline" className="gap-2 *:hover:cursor-pointer overflow-x-auto overscroll-x-contain
                 scroll-smooth snap-x snap-proximity
                 [-webkit-overflow-scrolling:touch]
                 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ToggleGroupItem value="a">
            <Diamond className="size-4" />
            <span className="text-[11px]">Manicure</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="b">
             <Diamond className="size-4" />
            <span className="text-[11px]">Pedicure</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="c">
            <Diamond className="size-4" />
            <span className="text-[11px]">Esmaltação</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="d">
            <Diamond className="size-4" />
            <span className="text-[11px]">Esmaltação</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="e">
            <Diamond className="size-4" />
            <span className="text-[11px]">Esmaltação</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="f">
            <Diamond className="size-4" />
            <span className="text-[11px]">Esmaltação</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="px-6 py-4 flex flex-col gap-3">
        <div className="text-[11px] text-muted-foreground">
          5 prossifionais encontrados
        </div>

        <ProfessionalInfoCard name="Maria Silva" />
        <ProfessionalInfoCard name="João Souza"  />
        <ProfessionalInfoCard name="Ana Costa" />
        <ProfessionalInfoCard name="Ana Costa" />
        <ProfessionalInfoCard name="Ana Costa" />
        <ProfessionalInfoCard name="Ana Costa" />
        <ProfessionalInfoCard name="Ana Costa" />
        <ProfessionalInfoCard name="Ana Costa" />
      </div>
    </div>
  )
}
 

export default Search
