import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Bell } from 'lucide-react';

const NotificationBell = () => {
  return (
   <Popover>
        <PopoverTrigger render={
          <Button className="bg-white/18 rounded-full size-10">
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

