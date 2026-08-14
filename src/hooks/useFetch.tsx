import { useState, useCallback } from 'react'

const useFetch = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const request = useCallback(async (url: string, options?: RequestInit) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null)
        throw new Error(errorBody?.message || `Erro: ${response.status}`)
      }

      const json = response.status === 204 ? null : await response.json().catch(() => null)

      setData(json ?? [])
      return json
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(message)
      setData([])
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, error, loading, request }
}

export default useFetch