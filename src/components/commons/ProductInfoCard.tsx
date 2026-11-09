import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

type ProductInfoCardProps = {
  product: string
  desc?: string
  href?: string
  className?: string
}

// TODO(design): icon slot stays empty until the service icons are approved
const ProductInfoCard = ({ product, desc, href, className }: ProductInfoCardProps) => {
  const classes = cn(
    "flex h-full w-full flex-col items-center gap-1.5 rounded-[16px] border border-sich-border bg-white px-2 py-3 text-center shadow-sich-small-card",
    className,
  )

  const content = (
    <>
      <div className="size-10 shrink-0 rounded-[12px] bg-[#FDE7F0]" />
      <p className="text-[12px] font-medium text-sich-heading">{product}</p>
      {desc && <span className="text-[10px] text-sich-label">{desc}</span>}
    </>
  )

  if (!href) return <div className={classes}>{content}</div>

  return (
    <Link to={href} className={cn(classes, "transition-colors hover:border-primary/40")}>
      {content}
    </Link>
  )
}

export default ProductInfoCard
