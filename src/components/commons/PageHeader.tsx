import ArrowBack from "./ArrowBack"
import SichText from "./SichText"
import { cn } from "../../lib/utils"
import { useIsDesktop } from "@/hooks/useMedia"

type PageHeaderProps = {
  text: string
  className?: string
  backTo?: string
  backLabel?: string
}

const MobilePageHeader = ({ text, className, backTo, backLabel }: PageHeaderProps) => (
  <header className={cn("flex items-center gap-3 bg-white p-5", className)}>
    <ArrowBack to={backTo} label={backLabel} />
    <div role="heading" aria-level={1} className="min-w-0 wrap-anywhere">
      <SichText text={text} />
    </div>
  </header>
)

// Desktop already has the global header, so this one blends into the page background
const DesktopPageHeader = ({ text, className, backTo, backLabel }: PageHeaderProps) => (
  <header className={cn("flex items-center gap-4 px-6 pt-8", className)}>
    <ArrowBack to={backTo} label={backLabel} className="border border-sich-border bg-white hover:bg-sich-surface" />
    <h1 className="min-w-0 text-[26px] font-bold tracking-[-0.4px] text-sich-heading wrap-anywhere">{text}</h1>
  </header>
)

const PageHeader = (props: PageHeaderProps) => {
  const isDesktop = useIsDesktop()
  return isDesktop ? <DesktopPageHeader {...props} /> : <MobilePageHeader {...props} />
}

export default PageHeader
