import { useMedia } from '@/hooks/useMedia'

// Tailwind `md` breakpoint (48rem = 768px); used internally by shadcn Sidebar
const MD_BREAKPOINT_QUERY = '(min-width: 48rem)'

export function useIsMobile() {
  return !useMedia(MD_BREAKPOINT_QUERY)
}
