import { useCallback, useSyncExternalStore } from 'react'

// Tailwind v4 default `lg` breakpoint (64rem = 1024px), same used by shadcn
export const LG_BREAKPOINT_QUERY = '(min-width: 64rem)'

export function useMedia(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )

  const getSnapshot = () => window.matchMedia(query).matches

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

// True when viewport is >= lg (desktop layout)
export function useIsDesktop() {
  return useMedia(LG_BREAKPOINT_QUERY)
}
