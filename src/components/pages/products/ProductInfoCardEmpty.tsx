const ProductInfoCardEmpty = () => {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-[#f7f7f7] px-4 py-5">
      <div className="flex flex-col gap-2">
        <div className="h-3 w-36  rounded bg-[#e9e9e9]" />
        <div className="h-2.5 w-24  rounded bg-[#e9e9e9]" />
      </div>

      <div className="flex items-center gap-2">
        <div className="h-5 w-12  rounded-full bg-[#e9e9e9]" />
        <div className="flex flex-col gap-1">
          <div className="size-1  rounded-full bg-[#dcdcdc]" />
          <div className="size-1  rounded-full bg-[#dcdcdc]" />
          <div className="size-1  rounded-full bg-[#dcdcdc]" />
        </div>
      </div>
    </div>
  )
}

export default ProductInfoCardEmpty
