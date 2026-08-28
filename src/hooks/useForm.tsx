import { useCallback, useRef, useState, type ChangeEvent } from 'react'
import types from '../services/typeErros'

export type FieldType = keyof typeof types

export type Validator = (value: string) => boolean | string | Promise<boolean | string>

export interface UseFormOptions {
  type?: FieldType
  initialValue?: string
  required?: boolean
  isCheckbox?: boolean
  validator?: Validator
}

export interface UseFormReturn {
  value: string
  setValue: (value: string) => void
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onBlur: () => Promise<boolean>
  validate: () => Promise<boolean>
  error: string | null
  isValidating: boolean
  reset: () => void
}

const useForm = (options: UseFormOptions = {}): UseFormReturn => {
  const { type, initialValue = '', required = true, isCheckbox = false, validator } = options

  const [value, setValueState] = useState(initialValue)
  const [error, setError] = useState<string | null>(null)
  const [isValidating, setIsValidating] = useState(false)

  const requestIdRef = useRef(0)

  const validateFormat = useCallback(
    (val: string): { valid: boolean; error: string | null } => {
      if (!required) return { valid: true, error: null }

      if (isCheckbox) {
        if (val !== 'true') {
          return { valid: false, error: 'Esse campo precisa ser marcado' }
        }
        return { valid: true, error: null }
      }

      if (val.trim().length === 0) {
        return { valid: false, error: 'Preencha um valor' }
      }

      if (type && types[type] && !types[type].regex.test(val)) {
        return { valid: false, error: types[type].message }
      }

      return { valid: true, error: null }
    },
    [type, required, isCheckbox]
  )

  const validateFull = useCallback(
    async (val: string): Promise<boolean> => {
      const formatResult = validateFormat(val)

      if (!formatResult.valid) {
        setError(formatResult.error)
        return false
      }

      if (!validator) {
        setError(null)
        return true
      }

      const requestId = ++requestIdRef.current
      setIsValidating(true)

      try {
        const result = await validator(val)

        if (requestId !== requestIdRef.current) return false

        if (result === true) {
          setError(null)
          return true
        }

        setError(typeof result === 'string' ? result : 'Valor inválido')
        return false
      } catch {
        if (requestId !== requestIdRef.current) return false
        setError('Não foi possível validar agora, tente novamente')
        return false
      } finally {
        if (requestId === requestIdRef.current) setIsValidating(false)
      }
    },
    [validateFormat, validator]
  )

  const setValue = useCallback(
    (val: string) => {
      setValueState(val)
      if (error) setError(validateFormat(val).error)
    },
    [error, validateFormat]
  )

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const newValue = event.target.value

      setValueState(newValue)
      if (error) setError(validateFormat(newValue).error)
    },
    [error, validateFormat]
  )

  const onBlur = useCallback(() => validateFull(value), [validateFull, value])

  const validate = useCallback(() => validateFull(value), [validateFull, value])

  const reset = useCallback(() => {
    requestIdRef.current++
    setValueState(initialValue)
    setError(null)
    setIsValidating(false)
  }, [initialValue])

  return { value, setValue, onChange, onBlur, validate, error, isValidating, reset }
}

export default useForm