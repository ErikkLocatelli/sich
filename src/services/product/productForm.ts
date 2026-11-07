import { formatCurrency, formatDuration } from "@/services/schedule/formatters"

export const MAX_PRODUCT_IMAGES = 3
export const ACCEPTED_IMAGE_TYPES = "image/png,image/jpeg,image/webp"
export const PRODUCT_IMAGES_TIP = `Cadastre até ${MAX_PRODUCT_IMAGES} imagens para o produto. Formatos aceitos: JPG, PNG ou WEBP`
export const PRODUCT_DURATION_TIP = "Para atendimentos a domicílio, considere o tempo de locomoção média para atendimentos próximos a sua região no tempo de atendimento."

/** "R$ 1.234,50" | "1234,5" -> 1234.5; NaN when the input is not a number */
export const parsePriceInput = (value: string) => {
  if (!value.trim()) return NaN
  return Number(value.replace(/^R\$\s?/, "").replace(/\./g, "").replace(",", "."))
}

/** "01:30" | "01:30:00" -> 90; null when the input is not a time */
export const durationToMinutes = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number)
  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) return null
  return hours * 60 + minutes
}

export const pricePreviewLabel = (value: string) => {
  const price = parsePriceInput(value)
  return Number.isFinite(price) ? formatCurrency(price) : "R$ —"
}

export const durationPreviewLabel = (value: string) => {
  const minutes = durationToMinutes(value)
  return minutes ? formatDuration(minutes) : "—"
}
