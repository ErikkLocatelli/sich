import { describe, expect, it, vi } from "vitest"
import { act, renderHook } from "@testing-library/react"
import type { FormEvent } from "react"

import { useValidatedSubmit } from "./useValidatedSubmit"

const submitEvent = () => ({ preventDefault: vi.fn() }) as unknown as FormEvent<HTMLFormElement>

describe("useValidatedSubmit", () => {
  it("prevents the native submit and submits when validation passes", async () => {
    const submit = vi.fn()
    const { result } = renderHook(() => useValidatedSubmit(async () => true, submit))
    const event = submitEvent()

    await act(() => result.current.handleSubmit(event))

    expect(event.preventDefault).toHaveBeenCalled()
    expect(submit).toHaveBeenCalledOnce()
    expect(result.current.validating).toBe(false)
  })

  it("does not submit when validation fails", async () => {
    const submit = vi.fn()
    const { result } = renderHook(() => useValidatedSubmit(async () => false, submit))

    await act(() => result.current.handleSubmit(submitEvent()))

    expect(submit).not.toHaveBeenCalled()
    expect(result.current.validating).toBe(false)
  })

  it("flags validating while validation is pending", async () => {
    let resolve!: (valid: boolean) => void
    const validate = () => new Promise<boolean>((res) => { resolve = res })
    const { result } = renderHook(() => useValidatedSubmit(validate, vi.fn()))

    let pending!: Promise<void>
    act(() => { pending = result.current.handleSubmit(submitEvent()) })
    expect(result.current.validating).toBe(true)

    await act(async () => {
      resolve(false)
      await pending
    })
    expect(result.current.validating).toBe(false)
  })

  it("resets validating and propagates the error when validation throws", async () => {
    const submit = vi.fn()
    const { result } = renderHook(() => useValidatedSubmit(() => Promise.reject(new Error("boom")), submit))

    await act(async () => {
      await expect(result.current.handleSubmit(submitEvent())).rejects.toThrow("boom")
    })

    expect(submit).not.toHaveBeenCalled()
    expect(result.current.validating).toBe(false)
  })
})
