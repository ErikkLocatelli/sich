const Card = ({children, className}: {children: React.ReactNode; className: string}) => {
  return (
    <div className={` bg-white shadow-sich-small-card rounded-[16px] ${className}`}>
      {children}
    </div>
  )
}

export default Card
