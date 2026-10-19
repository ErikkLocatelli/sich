import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { EllipsisVertical } from "lucide-react"

const EllipsisMenu = ({children}: {children: React.ReactNode}) => {
  return (
    <Popover >
        <PopoverTrigger render={
          <Button size='icon' variant="ghost" >
            <EllipsisVertical className='size-5'/>
          </Button>
        }/>
        <PopoverContent className="w-40 divide-y *:hover:cursor-pointer">
         {children}
        </PopoverContent>
   </Popover>
  )
}

export default EllipsisMenu
