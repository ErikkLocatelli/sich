import { afterAll, afterEach, beforeAll, beforeEach } from "vitest"
import { cleanup, configure } from "@testing-library/react"

import { requestLog, server } from "./server"

// The first request of each file is slow in jsdom
configure({ asyncUtilTimeout: 8000 })

beforeAll(() => server.listen({ onUnhandledFrame: "error" }))

beforeEach(() => {
  window.localStorage.setItem("token", "test-token")
})

afterEach(() => {
  cleanup()
  server.resetHandlers()
  requestLog.length = 0
  window.localStorage.clear()
})

afterAll(() => server.close())
