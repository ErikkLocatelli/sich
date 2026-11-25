import { useEffect, useRef } from "react"

const MAX_OFFSET = 60

const prefersReducedMotion = () =>
  typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Shifts the element vertically by `speed` × its distance from the viewport centre.
 * Writes the CSS `translate` property directly (no re-renders) and stays still under reduced motion.
 */
const useParallax = <T extends HTMLElement>(speed = 0.08) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || prefersReducedMotion()) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const raw = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed
      // Clamp so far-off elements don't start displaced by hundreds of pixels
      const offset = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, raw))
      element.style.translate = `0 ${offset.toFixed(1)}px`
    }
    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [speed])

  return ref
}

export default useParallax
