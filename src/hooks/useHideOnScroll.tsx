import { useEffect, useState } from 'react'

export function useHideOnScroll() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 0) {
        setVisible(true)
      } else if (
        currentScrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 1
      ) {
        setVisible(true)
      } else if (currentScrollY < lastScrollY) {
        setVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setVisible(false)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return visible
}