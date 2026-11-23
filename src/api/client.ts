export type ApiRequest = {
  url: string
  options: RequestInit
}

/** Failed API call. `serverMessage` is the backend's own message, when it sent one. */
export class ApiError extends Error {
  status: number
  serverMessage: string | null

  constructor(message: string, status: number, serverMessage: string | null = null) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.serverMessage = serverMessage
  }
}

export const NETWORK_ERROR_MESSAGE = "Não foi possível conectar ao servidor."
export const MISSING_TOKEN_MESSAGE = "Sessão expirada. Entre novamente."

export const getToken = () => window.localStorage.getItem("token")

export const requireToken = () => {
  const token = getToken()
  if (!token) throw new ApiError(MISSING_TOKEN_MESSAGE, 401)
  return token
}

const readJson = async (response: Response) => {
  if (response.status === 204) return null
  return response.json().catch(() => null)
}

/** Runs a request built by the `*_GET`/`*_POST` helpers; throws `ApiError` on network or HTTP failure. */
export const apiFetch = async <T,>({ url, options }: ApiRequest): Promise<T> => {
  let response: Response

  try {
    response = await fetch(url, options)
  } catch {
    throw new ApiError(NETWORK_ERROR_MESSAGE, 0)
  }

  const json = await readJson(response)

  if (!response.ok) {
    const serverMessage = typeof json?.message === "string" && json.message ? json.message : null
    throw new ApiError(serverMessage ?? `Erro: ${response.status}`, response.status, serverMessage)
  }

  return json as T
}

/** Backend message when there is one, otherwise the screen's own copy. */
export const errorMessage = (error: unknown, fallback: string) =>
  error instanceof ApiError && error.serverMessage ? error.serverMessage : fallback

/** Rewrites a failure with the step's copy, so a multi-step mutation reports which step broke. */
export const withFallback = <T,>(promise: Promise<T>, fallback: string) =>
  promise.catch((error: unknown) => {
    const status = error instanceof ApiError ? error.status : 0
    throw new ApiError(errorMessage(error, fallback), status)
  })
