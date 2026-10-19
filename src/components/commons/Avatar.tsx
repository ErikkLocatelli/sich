import { cn } from "../../lib/utils"

const Avatar = ({ name, url, className }: { name: string; url?: string; className?: string }) => {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className={cn("size-14 flex items-center justify-center bg-primary rounded-[16px] overflow-hidden", className)}>
        {url ? 
            <img src={url} alt="Professional" className="size-full object-cover"/> 
            :
            <span className="text-[15px] font-semibold text-white uppercase">{initials}</span> 
        }
      </div>
  )
}

export default Avatar
