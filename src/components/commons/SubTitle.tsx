const SubTitle = ({text, className}: {text: string; className?: string}) => {
  return (
    <h3 className={`text-[15px] font-semibold ${className}`}>{text}</h3>
  )
}

export default SubTitle
