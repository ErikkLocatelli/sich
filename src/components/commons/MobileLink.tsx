import LabelLink from "./LabelLink"
import SubTitle from "./SubTitle"

const MobileLink = ({title, link, className, href}:{title: string, link: string, href?: string, className?: string}) => {
  return (
    <div className={`flex flex-row items-center justify-between ${className || ''}`}>
        <SubTitle text={title}/>
        <LabelLink label={link} href={href} className='text-[12px]'/>
    </div>
  )
}

export default MobileLink
