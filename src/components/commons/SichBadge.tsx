const SichBadge = ({children, className}: {children: React.ReactNode; className?: string;}) => {

  return (
    <div className={`flex w-full flex-col overflow-hidden rounded-b-[28px] bg-sich-gradient shadow-sich-button lg:hidden ${className}`}>
      {children}
    </div>
  )
}

export default SichBadge
