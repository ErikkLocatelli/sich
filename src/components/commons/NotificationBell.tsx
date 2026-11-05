import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Bell } from 'lucide-react';

import { cn } from "@/lib/utils"

const NotificationBell = ({ className }: { className?: string }) => {
  return (
   <Popover>
        <PopoverTrigger render={
          <Button aria-label="Notificações" className={cn("bg-white/18 rounded-full size-10", className)}>
            <Bell className='size-5'/>
          </Button>
        }/>
        <PopoverContent className="w-60 divide-y">
          <p>Notificaçao 1</p>
          <p>Notificaçao 2</p>
          <p>Notificaçao 3</p>
        </PopoverContent>
   </Popover>
  )
}

export default NotificationBell
