import { useState, useCallback } from 'react'

const useFetch = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const request = useCallback(async (url, options) => {
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
      setError(err.message)
      setData([])
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, error, loading, request }
}

export default useFetch