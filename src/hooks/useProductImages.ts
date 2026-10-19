import { useCallback, useEffect, useRef, useState } from 'react'
import type { Image, NewImage } from '../models/image'


const MAX_IMAGES = 3

const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Não foi possível ler a imagem."))
        return
      }

      resolve(reader.result)
    }

    reader.onerror = () => {
      reject(new Error("Não foi possível converter a imagem."))
    }

    reader.readAsDataURL(file)
  })
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

  const setInitialImages = useCallback((images: Image[]) => {
    setExistingImages(images)
    setRemovedImages([])
  }, [])

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