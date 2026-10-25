import usePreviousRoute from "../../hooks/usePreviousRoute"

const ScheduleCustomer = () => {
  const previousRoute = usePreviousRoute()

  return (
    <div className={previousRoute === "/" || previousRoute === "/search" ? "animateRight" : "animateLeft"}>
      agenda do cliente funciona
    </div>
  )
}

export default ScheduleCustomer
