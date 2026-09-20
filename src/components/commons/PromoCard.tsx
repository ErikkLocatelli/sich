const PromoCard = ({promo, cupom, data, className}:{promo:string, cupom:string, data :string, className?:string}) => {
  return (
    <div className={`rounded-[16px] bg-[#FFD1E1]/80 flex flex-col gap-1.5 p-3 ${className || ''}`}>
      <p className="text-[12px] font-semibold text-sich-magenta">PROMOÇÃO</p>
      <p className="text-[15px] font-semibold text-[#1C1830]">{promo}</p>
      <p className="text-[12px] text-sich-label">Use o cupom: <span className="font-bold">{cupom}</span> até {data}</p>
    </div>
  )
}

export default PromoCard
