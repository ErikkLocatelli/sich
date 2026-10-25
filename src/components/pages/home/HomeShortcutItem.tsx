import { Link } from "react-router-dom"

import type { LucideIcon } from "lucide-react"
import { ChevronRight } from 'lucide-react';

const HomeShortcutItem = ({ icon: Icon, link, text }: { icon: LucideIcon; link: string; text: string }) => {
  return (
    <Link to={`/${link}`} className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2 py-2">
            <Icon className="size-5" />
            <span className="text-sm font-medium">{text}</span>
        </div>
      <ChevronRight className="size-3"/>
    </Link>
  )
}

export default HomeShortcutItem
