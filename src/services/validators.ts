import type { Validator } from '../hooks/useForm'

export const validateCpfDigits: Validator = (value) => {
  const cpf = value.replace(/\D/g, '')

  if (/^(\d)\1{10}$/.test(cpf)) return 'CPF inválido'

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

  return cpf === cpf.slice(0, 9) + String(digit1) + String(digit2) ? true : 'CPF inválido'
}

export const validateCepExists: Validator = async (value) => {
  const cep = value.replace(/\D/g, '')

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()

    if (data.erro) return 'CEP não encontrado'
    return true
  } catch {
    return 'Não foi possível verificar o CEP agora'
  }
}