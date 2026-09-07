import Sich from '../../assets/icons/sich.svg?react'

const SichBadge = () => {
  return (
    <div className="flex h-65 w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-b-[32px] bg-sich-gradient shadow-sich-button lg:hidden">
      <Sich className="size-16 rounded-[20px] flex items-center justify-center" />
      <h1 className='text-[26px] font-bold text-white'>SICH</h1>
      <span className='text-[11px] text-white/90'>Beleza a domicilio sob medida</span>
    </div>
  )
}

export default SichBadge
