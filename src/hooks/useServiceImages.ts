import { useEffect, useRef, useState } from 'react'
import type { Image, NewImage } from '../models/image'


const MAX_IMAGES = 5

const useServiceImages = (initialImages: Image[] = []) => {
  const [existingImages, setExistingImages] = useState(initialImages)
  const [newImages, setNewImages] = useState<NewImage[]>([])
  const objectUrls = useRef(new Set<string>())

    useEffect(() => {
    const urls = objectUrls.current

    return () => {
        urls.forEach(url => URL.revokeObjectURL(url))
    }
    }, [])

  const addImages = (files: FileList | File[]) => {
    const availableSlots = MAX_IMAGES - existingImages.length - newImages.length

    if (availableSlots <= 0) return

    const selectedFiles = Array.from(files).slice(0, availableSlots)

    const images = selectedFiles.map(file => {
      const url = URL.createObjectURL(file)
      objectUrls.current.add(url)

      return { file, url }
    })

    setNewImages(current => [...current, ...images])
  }

  const removeExistingImage = (id: number) => {
    setExistingImages(current =>
      current.filter(image => image.id !== id)
    )
  }

  const removeNewImage = (url: string) => {
    URL.revokeObjectURL(url)
    objectUrls.current.delete(url)

    setNewImages(current =>
      current.filter(image => image.url !== url)
    )
  }

  return {
    existingImages,
    newImages,
    addImages,
    removeExistingImage,
    removeNewImage,
    canAddImages: existingImages.length + newImages.length < MAX_IMAGES,
  }
}

export default useServiceImages