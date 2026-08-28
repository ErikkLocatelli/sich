import Sich from '../../assets/icons/sich.svg?react'

const SichBadge = () => {
  return (
    <div className="bg-sich-gradient w-full h-65 rounded-b-[36px] flex items-center justify-center flex-col gap-1.5 shadow-2xl">
        <Sich className="size-16 rounded-[20px] flex items-center justify-center" />
        <h1 className='text-white text-2xl font-bold'>SICH</h1>
        <span className='text-white text-[11px]'>Beleza a domicílio sob medida</span>
    </div>
  )
}

export default SichBadge
