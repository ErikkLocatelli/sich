import LabelLink from "./LabelLink"
import Title from "./Title"

const MobileLink = ({title, link, mt}:{title: string, link: string, mt?: string}) => {
  return (
    <div className={`flex flex-row items-center justify-between px-6 mt-${mt ? mt : '5'}`}>
        <Title text={title}/>
        <LabelLink label={link} className='text-[12px]'/>
    </div>
  )
}

export default MobileLink
