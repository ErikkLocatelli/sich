import Card from "../../commons/Card"
import SubTitle from "../../commons/SubTitle"
import HomeShortcutItem from "./HomeShortcutItem"

import { cn } from "@/lib/utils"

import { Cog, Plus, CalendarSync } from 'lucide-react';

const HomeShortcuts = ({ title, className }: { title?: string; className?: string }) => {
  return (
    <Card className={cn("px-3 mt-4 mb-3", className)}>
        {title && <SubTitle text={title} className="pt-2" />}
        <div className="divide-y divide-gray-200">
            <HomeShortcutItem icon={Plus} link="products/new" text="Cadastrar um novo serviço" />
            <HomeShortcutItem icon={CalendarSync} link="schedule/disponibility" text="Alterar disponibilidade" />
            <HomeShortcutItem icon={Cog} link="settings" text="Configurações gerais" />
        </div>
    </Card>
  )
}

export default HomeShortcuts
