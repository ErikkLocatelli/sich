import useHead from "../../hooks/useHead"
import usePreviousRoute from "../../hooks/usePreviousRoute"

const Financial = () => {
  useHead("Financeiro", "Gerencie suas finanças na SICH")
  const previousRoute = usePreviousRoute()

  return (
    <div className={previousRoute === "/products" ? "animateRight" : "animateLeft"}>
      Financeiral do provider funciona
    </div>
  )
}

export default Financial
