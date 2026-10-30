import ArrowBack from "./ArrowBack"
import SichText from "./SichText"
import { cn } from "../../lib/utils"

type PageHeaderProps = {
  text: string
  className?: string
  backTo?: string
  backLabel?: string
}

const PageHeader = ({ text, className, backTo, backLabel }: PageHeaderProps) => (
  <header className={cn("flex items-center gap-3 bg-white p-5", className)}>
    <ArrowBack to={backTo} label={backLabel} />
    <div role="heading" aria-level={1} className="min-w-0 [overflow-wrap:anywhere]">
      <SichText text={text} />
    </div>
  </header>
)

export default PageHeader
