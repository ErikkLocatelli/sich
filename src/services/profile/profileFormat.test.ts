import { describe, expect, it } from "vitest"

import { contactLine } from "./profileFormat"

describe("contactLine", () => {
  it("joins email and formatted phone", () => {
    expect(contactLine("ana@email.com", "11988881234")).toBe("ana@email.com · (11) 98888-1234")
  })

  it("keeps an already formatted phone", () => {
    expect(contactLine("ana@email.com", "(11) 98888-1234")).toBe("ana@email.com · (11) 98888-1234")
  })

  it("shows only the email when the phone is missing or blank", () => {
    expect(contactLine("ana@email.com", null)).toBe("ana@email.com")
    expect(contactLine("ana@email.com", "   ")).toBe("ana@email.com")
  })

  it("shows only the phone when the email is missing", () => {
    expect(contactLine(undefined, "11988881234")).toBe("(11) 98888-1234")
  })

  it("returns an empty string when both are missing", () => {
    expect(contactLine(null, null)).toBe("")
    expect(contactLine("  ", "")).toBe("")
  })
})
