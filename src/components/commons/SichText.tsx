const SichText = ({text, className}: {text: string; className?: string}) => {
  return (
    <div className={`text-[17px] text-sich-magenta uppercase font-bold ${className || ''}`}>
      {text}
    </div>
  )
}

export default SichText
