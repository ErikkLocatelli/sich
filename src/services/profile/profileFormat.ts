import IMask from "imask"
import type { FactoryArg } from "imask"

const PHONE_MASK = { mask: "(00) 00000-0000" } as FactoryArg

/** "000.000.000-00" or "00.000.000/0000-00", depending on the number of digits. */
export const formatCpfCnpj = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 14)

  if (digits.length > 11) {
    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4")
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5")
  }

  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
}

export const formatPhone = (value: string) => IMask.pipe(value, PHONE_MASK)

/** "00000-000" from the digits the backend stores. */
export const formatCep = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8)
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
}

/** Year of the sign-up instant, or null when it is missing or invalid. */
export const sinceYear = (createdAt: string | null | undefined) => {
  if (!createdAt) return null
  const date = new Date(createdAt)
  return Number.isNaN(date.getTime()) ? null : String(date.getFullYear())
}

/** "email · (11) 98888-1234"; blank parts are left out, empty string when both are missing. */
export const contactLine = (email: string | null | undefined, phone: string | null | undefined) => {
  const parts = [email?.trim(), phone?.trim() ? formatPhone(phone.trim()) : null]
  return parts.filter(Boolean).join(" · ")
}
