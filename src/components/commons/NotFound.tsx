import { Link } from 'react-router-dom'

import Door from '../../assets/svgs/door.svg?react'

import {Button} from "@/components/ui/button"

const NotFound = () => {
  return (
    <div className="flex flex-col md:flex-row m-auto">
      <div className="size-80">
        <Door  style={{ width: '100%', height: '100%' }}/>
      </div>
      <div className="flex flex-col justify-center items-start gap-2 w-80">
        <span className="text-[2.35em] font-bold">404!</span>
        <span><span className="text-primary font-bold">Oops!</span> Parece que você abriu a porta errada. A página que você procura não está por aqui.</span>
        <Button variant="default" className="py-4 px-3 rounded-[16px] hover:cursor-pointer mt-4">
          <Link to="/" className="text-white">Ir para ínicio</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound
