import { describe, expect, it } from "vitest"

import { dataUrlBytes } from "../image/dataUrl"
import { MAX_PHOTO_BYTES, PhotoError, preparePhoto } from "./profilePhoto"

const file = (type: string, content = "abc") => new File([content], "photo", { type })

/** Data URL whose decoded size is exactly `bytes`. */
const dataUrlOf = (bytes: number) => `data:image/webp;base64,${btoa("a".repeat(bytes))}`

describe("preparePhoto", () => {
  it("rejects files that aren't png, jpeg or webp without reading them", async () => {
    await expect(preparePhoto(file("image/gif"))).rejects.toThrow(new PhotoError("Use uma imagem PNG, JPEG ou WEBP."))
    await expect(preparePhoto(file(""))).rejects.toBeInstanceOf(PhotoError)
  })

  it("returns the reduced image", async () => {
    const reduced = dataUrlOf(10)

    await expect(preparePhoto(file("image/png"), async () => reduced)).resolves.toBe(reduced)
  })

  it("falls back to the original file when the browser can't reduce it", async () => {
    const photo = await preparePhoto(file("image/jpeg", "abc"), async () => { throw new Error("no canvas") })

    expect(photo).toBe(`data:image/jpeg;base64,${btoa("abc")}`)
  })

  it("accepts exactly 1 MB and rejects anything above it", async () => {
    await expect(preparePhoto(file("image/png"), async () => dataUrlOf(MAX_PHOTO_BYTES))).resolves.toBeTruthy()
    await expect(preparePhoto(file("image/png"), async () => dataUrlOf(MAX_PHOTO_BYTES + 1)))
      .rejects.toThrow("A foto deve ter no máximo 1 MB.")
  })
})

describe("dataUrlBytes", () => {
  it.each([1, 2, 3, 100])("matches the decoded size with any padding (%i bytes)", (bytes) => {
    expect(dataUrlBytes(dataUrlOf(bytes))).toBe(bytes)
  })
})
