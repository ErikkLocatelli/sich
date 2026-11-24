import { useCallback, useEffect, useRef, useState } from 'react'
import type { Image, NewImage } from '../models/image'
import { MAX_PRODUCT_IMAGES as MAX_IMAGES } from '../services/product/productForm'
import { fileToDataUrl } from '../services/image/dataUrl'

export type ProductImageItem = {
  key: string
  url: string
  onRemove: () => void
}

const useProductImages = (initialImages: Image[] = []) => {
  const [existingImages, setExistingImages] = useState(initialImages)
  const [newImages, setNewImages] = useState<NewImage[]>([])
  const [removedImages, setRemovedImages] = useState<number[]>([])
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
    setRemovedImages(current =>
      current.includes(id) ? current : [...current, id]
    )
  }

  /** Server state replaces everything: pending uploads are dropped so a saved image isn't listed twice. */
  const setInitialImages = useCallback((images: Image[]) => {
    objectUrls.current.forEach(url => URL.revokeObjectURL(url))
    objectUrls.current.clear()
    setExistingImages(images)
    setNewImages([])
    setRemovedImages([])
  }, [])

  const removeNewImage = (url: string) => {
    URL.revokeObjectURL(url)
    objectUrls.current.delete(url)

    setNewImages(current =>
      current.filter(image => image.url !== url)
    )
  }

  const items: ProductImageItem[] = [
    ...existingImages.map(image => ({
      key: `existing-${image.id}`,
      url: image.url,
      onRemove: () => removeExistingImage(image.id),
    })),
    ...newImages.map(image => ({
      key: image.url,
      url: image.url,
      onRemove: () => removeNewImage(image.url),
    })),
  ]

  return {
    items,
    existingImages,
    newImages,
    removedImages,
    addImages,
    removeExistingImage,
    setInitialImages,
    removeNewImage,
    fileToDataUrl,
    canAddImages: existingImages.length + newImages.length < MAX_IMAGES,
  }
}

export default useProductImages