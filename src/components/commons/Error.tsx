const Error = ({message, className}: {message: string, className?: string}) => {
  return (
    <span className={`text-[11px] text-destructive ${className || ''}`}>{message}</span>
  )
}

export default Error
