const ServiceInfoCard = ({service, desc}:{service:string, desc:string}) => {
  return (
    <div className="flex flex-col bg-white shadow-sich-small-card rounded-[16px] w-full items-center justify-center gap-1.5 py-3">
      <div className="size-10 bg-[#FDE7F0] rounded-[14px]"></div>
      <p className="text-[12px] text-black font-medium">{service}</p>
      <span className="text-[10px] text-sich-label">{desc}</span>
    </div>
  )
}

export default ServiceInfoCard
