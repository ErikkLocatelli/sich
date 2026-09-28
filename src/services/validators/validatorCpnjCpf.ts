import type { Validator } from '../../hooks/useForm'

const CPF_LENGTH = 11
const CNPJ_LENGTH = 14

const isCpfValid = (cpf: string) => {
  if (/^(\d)\1{10}$/.test(cpf)) return false

  const calcDigit = (base: string, factor: number) => {
    let total = 0
    for (const char of base) {
      total += Number(char) * factor
      factor--
    }
    const rest = total % 11
    return rest < 2 ? 0 : 11 - rest
  }

  const digit1 = calcDigit(cpf.slice(0, 9), 10)
  const digit2 = calcDigit(cpf.slice(0, 9) + digit1, 11)

  return cpf === cpf.slice(0, 9) + String(digit1) + String(digit2)
}

const isCnpjValid = (cnpj: string) => {
  if (/^(\d)\1{13}$/.test(cnpj)) return false

  const calcDigit = (base: string, weights: number[]) => {
    let total = 0
    for (let i = 0; i < base.length; i++) {
      total += Number(base[i]) * weights[i]
    }
    const rest = total % 11
    return rest < 2 ? 0 : 11 - rest
  }

  const firstWeights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const secondWeights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  const digit1 = calcDigit(cnpj.slice(0, 12), firstWeights)
  const digit2 = calcDigit(cnpj.slice(0, 12) + digit1, secondWeights)

  return cnpj === cnpj.slice(0, 12) + String(digit1) + String(digit2)
}

export const validateCpfCnpjDigits: Validator = (value) => {
  const digits = value.replace(/\D/g, '')

  if (digits.length < CPF_LENGTH) {
    return `CPF/CNPJ: tamanho mínimo não atingido`
  }

  if (digits.length === CPF_LENGTH) {
    return isCpfValid(digits) ? true : 'CPF inválido'
  }

  if (digits.length < CNPJ_LENGTH) {
    // ainda digitando em direção ao tamanho do CNPJ
    return true
  }

  if (digits.length === CNPJ_LENGTH) {
    return isCnpjValid(digits) ? true : 'CNPJ inválido'
  }

  return `CPF/CNPJ: tamanho máximo atingido`
}
