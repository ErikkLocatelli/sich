export const greetingFor = (date: Date) => {
  const hour = date.getHours()

  if (hour < 12) return "Bom dia"
  if (hour < 18) return "Boa tarde"
  return "Boa noite"
}

/** Today's not-yet-finished appointments as a sentence; null while they are loading. */
export const remainingCountLabel = (count: number | null | undefined) => {
  if (count == null) return null
  if (count === 0) return "Você não tem mais atendimentos hoje"
  if (count === 1) return "Você tem 1 atendimento restante hoje"
  return `Você tem ${count} atendimentos restantes hoje`
}

/** "Qua, 14 Mai" */
export const shortDateLabel = (date: Date) =>
  date
    .toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "short" })
    .replace(/\./g, "")
    .replace(/(^| )([a-z])/g, (_, separator, letter) => separator + letter.toUpperCase())
