const Title = ({text, color} : {text: string, color?: string}) => {
  return (
    <h2 className={`text-[18px] lg:text-[36px] font-semibold ${color || 'text-sich-heading'} lg:text-center`}>{text}</h2>
  )
}

export default Title
