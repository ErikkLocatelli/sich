import type { Validator } from '../../hooks/useForm'

interface ViaCepResponse {
  erro?: boolean
  logradouro: string
  localidade: string
  uf: string
}

const UF_TO_STATE: Record<string, string> = {
  AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia',
  CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás',
  MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais',
  PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí',
  RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul',
  RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo',
  SE: 'Sergipe', TO: 'Tocantins'
}

export interface CepAddress {
  street: string
  city: string
  state: string
}

export const createCepValidator = (onFound: (address: CepAddress) => void): Validator => {
  return async (value) => {
    const cep = value.replace(/\D/g, '')

    if (cep.length !== 8) return 'CEP inválido'

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data: ViaCepResponse = await response.json()

      if (data.erro) return 'CEP não encontrado'

      onFound({
        street: data.logradouro,
        city: data.localidade,
        state: UF_TO_STATE[data.uf] ?? data.uf
      })

      return true
    } catch {
      return 'Não foi possível verificar o CEP agora'
    }
  }
}