const currencyFormat = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })

export const formatCurrency = (value: number) => currencyFormat.format(value)

/** 45 -> "45min", 60 -> "1h", 90 -> "1h30" */
export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60

  if (hours === 0) return `${rest}min`
  if (rest === 0) return `${hours}h`
  return `${hours}h${rest.toString().padStart(2, "0")}`
}
