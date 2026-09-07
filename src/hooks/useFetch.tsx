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

      const json = response.status === 204 ? null : await response.json().catch(() => null)

      setData(json ?? [])
      if (!response.ok) {
        throw new Error(json?.message || `Erro: ${response.status}`)
      }

      return { response, json }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(message)
      setData([])
      return { response: null, json: null }
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, error, loading, request }
}

export default useFetch