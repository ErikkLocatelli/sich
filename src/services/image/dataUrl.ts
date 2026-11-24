export const fileToDataUrl = (file: Blob): Promise<string> => {
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

/** Decoded size of a base64 data URL, without decoding it. */
export const dataUrlBytes = (dataUrl: string) => {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1)
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0
  return Math.floor((base64.length * 3) / 4) - padding
}
