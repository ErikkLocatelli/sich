const SichBadge = ({children, className}: {children: React.ReactNode; className?: string;}) => {

  return (
    <div className={`flex h-65 w-full flex-col overflow-hidden rounded-b-[32px] bg-sich-gradient shadow-sich-button lg:hidden ${className}`}>
      {children}
    </div>
  )
}

export default SichBadge
