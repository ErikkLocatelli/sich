import Card from "../../commons/Card"
import HomeShortcutItem from "./HomeShortcutItem"

import { Cog, Plus, CalendarSync } from 'lucide-react';

const HomeShortcuts = ({className}: {className?: string}) => {
  return (
    <Card className={`px-3 mt-4 mb-3 divide-y divide-gray-200 ${className}`}>
        <HomeShortcutItem icon={Plus} link="products/new" text="Cadastrar um novo serviço" />
        <HomeShortcutItem icon={CalendarSync} link="schedule/disponibility" text="Alterar disponibilidade" />
        <HomeShortcutItem icon={Cog} link="settings" text="Configurações gerais" />
    </Card>
  )
}

export default HomeShortcuts
