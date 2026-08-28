import { Link } from "react-router-dom";

const LabelLink = ({ label, href, className }: { label: string; href?: string | null; className?: string }) => {
  return (
    <span className={`text-[11px] font-medium text-primary hover:underline ${className || ''}`}>
      {href ? <Link to={href}>{label}</Link> : label}
    </span>
  )
}

export default LabelLink
