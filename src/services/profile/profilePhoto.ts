import { dataUrlBytes, fileToDataUrl } from "../image/dataUrl"

export const PHOTO_ACCEPT = "image/png,image/jpeg,image/webp"

/** Backend limit for the profile photo. */
export const MAX_PHOTO_BYTES = 1024 * 1024

/** The photo shows up in lists, so it never needs more than this. */
const MAX_PHOTO_SIDE = 512

const ACCEPTED_TYPES = PHOTO_ACCEPT.split(",")

export class PhotoError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "PhotoError"
  }
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new PhotoError("Não foi possível abrir a imagem."))
    image.src = src
  })

/** Scales the image down to {@link MAX_PHOTO_SIDE} and re-encodes it as webp; null when the browser can't draw it. */
const resize = async (source: string): Promise<string | null> => {
  const image = await loadImage(source)
  const scale = Math.min(1, MAX_PHOTO_SIDE / Math.max(image.naturalWidth, image.naturalHeight))
  const canvas = document.createElement("canvas")
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))

  const context = canvas.getContext("2d")
  if (!context) return null

  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  const result = canvas.toDataURL("image/webp", 0.85)
  // Browsers without webp encoding fall back to png, which is usually larger
  return result.startsWith("data:image/webp") ? result : canvas.toDataURL("image/jpeg", 0.85)
}

/**
 * Turns the picked file into the data URL the API accepts: png/jpeg/webp, reduced
 * on the client and at most 1 MB. Throws `PhotoError` with the copy to show.
 */
export const preparePhoto = async (file: File, resizeImage = resize): Promise<string> => {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new PhotoError("Use uma imagem PNG, JPEG ou WEBP.")
  }

  const original = await fileToDataUrl(file)
  const reduced = await resizeImage(original).catch(() => null)
  const photo = reduced ?? original

  if (dataUrlBytes(photo) > MAX_PHOTO_BYTES) {
    throw new PhotoError("A foto deve ter no máximo 1 MB.")
  }

  return photo
}
