import { useState, useEffect, useCallback, useRef } from 'react'

export function usePolling(fetcher, intervalMs = 30000) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const intervalRef = useRef(null)

  const refresh = useCallback(async () => {
    try {
      const result = await fetcher()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [fetcher])

  useEffect(() => {
    refresh()
    intervalRef.current = setInterval(refresh, intervalMs)
    return () => clearInterval(intervalRef.current)
  }, [refresh, intervalMs])

  return { data, loading, error, refresh }
}
