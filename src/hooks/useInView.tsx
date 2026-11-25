import { useEffect, useRef, useState } from "react"

// Without an observer (old browsers, jsdom) content is shown at once instead of staying hidden
const canObserve = () => typeof IntersectionObserver !== "undefined"

/** True once the element has entered the viewport (fires a single time). */
const useInView = <T extends Element>(options: IntersectionObserverInit = { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }) => {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(() => !canObserve())
  const { threshold, rootMargin } = options

  useEffect(() => {
    const element = ref.current
    if (!element || inView) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return
      // A fast scroll or anchor jump can skip past an element; reveal it rather than leave a gap above
      const scrolledPast = entry.boundingClientRect.bottom < 0
      if (!entry.isIntersecting && !scrolledPast) return
      setInView(true)
      observer.disconnect()
    }, { threshold, rootMargin })

    observer.observe(element)
    return () => observer.disconnect()
  }, [inView, threshold, rootMargin])

  return { ref, inView }
}

export default useInView
