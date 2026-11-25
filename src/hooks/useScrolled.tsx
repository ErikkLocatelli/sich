import { useEffect, useState } from "react"

/** True while the page is scrolled past `offset` pixels. */
const useScrolled = (offset = 16) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > offset)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [offset])

  return scrolled
}

export default useScrolled
