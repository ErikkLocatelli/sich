import SichText from "@/components/commons/SichText"

type StatsSummaryItem = {
  value: string
  label: string
}

const StatsSummary = ({ items }: { items: StatsSummaryItem[] }) => {
  return (
    <div className="mt-4 flex flex-row items-center">
      {items.map((item, index) => (
        <div className="contents" key={item.label}>
          {index > 0 && <div className="h-10 w-px bg-gray-300" />}
          <div className="flex flex-1 flex-col items-center">
            <SichText text={item.value} />
            <span className="text-[9px] text-(--label-text)">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsSummary
