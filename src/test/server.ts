import { setupServer } from "msw/node"

export const API = "http://api.test"

export const server = setupServer()

/** Paths requested during the test, e.g. "GET /categories". */
export const requestLog: string[] = []

server.events.on("request:start", ({ request }) => {
  const url = new URL(request.url)
  requestLog.push(`${request.method} ${url.pathname}${url.search}`)
})

export const countRequests = (entry: string) => requestLog.filter((item) => item === entry).length
