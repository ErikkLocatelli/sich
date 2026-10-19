const Title = ({text, color, className} : {text: string, color?: string, className?: string}) => {
  return (
    <h2 className={`text-[18px] lg:text-[28px] font-semibold ${color || 'text-sich-heading'} lg:text-center ${className || ''}`}>{text}</h2>
  )
}

export default Title
