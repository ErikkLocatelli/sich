import { fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { beforeAll, describe, expect, it, vi } from "vitest"

import ProtectedRoute from "@/routes/ProtectedRoute"
import { userContext, type UserContextType } from "@/services/userContext"
import { ALL_CATEGORIES, filterProfessionals, WELCOME_PROFESSIONALS, type WelcomeProfessional } from "@/services/welcome/welcomeContent"
import Welcome from "./Welcome"

// The signed-in path renders the app shell; keep it out of the landing tests
vi.mock("@/components/commons/MobileNav", () => ({ default: () => null }))

beforeAll(() => {
  window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })
})

const auth = (overrides: Partial<UserContextType>): UserContextType => ({
  login: false,
  authReady: true,
  data: null,
  userLogin: () => {},
  userLogout: () => {},
  ...overrides,
})

const renderAt = (path: string, value: UserContextType) =>
  render(
    <userContext.Provider value={value}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<p>app home</p>} />
            <Route path="/schedule" element={<p>schedule</p>} />
          </Route>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<p>login page</p>} />
        </Routes>
      </MemoryRouter>
    </userContext.Provider>,
  )

describe("Welcome", () => {
  it("points every login entry to /login and sign-up entries to /register", () => {
    renderAt("/welcome", auth({}))

    const loginLinks = screen.getAllByRole("link", { name: /^entrar$|já tenho conta/i })
    expect(loginLinks.length).toBeGreaterThanOrEqual(2)
    loginLinks.forEach((link) => expect(link.getAttribute("href")).toBe("/login"))

    screen.getAllByRole("link", { name: /criar conta/i }).forEach((link) => expect(link.getAttribute("href")).toBe("/register"))
  })

  it("links the brand back to the top of the page", () => {
    const { container } = renderAt("/welcome", auth({}))
    const top = container.querySelector("[id]")?.id

    screen.getAllByRole("link", { name: /voltar ao topo/i }).forEach((link) => expect(link.getAttribute("href")).toBe(`#${top}`))
  })

  it("renders the headline as the single h1", () => {
    renderAt("/welcome", auth({}))
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
  })

  it("sends signed-in users to the app", () => {
    renderAt("/welcome", auth({ login: true }))
    expect(screen.getByText("app home")).toBeTruthy()
  })

  it("keeps showing the landing while auth is still resolving", () => {
    renderAt("/welcome", auth({ authReady: false }))
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy()
  })
})

describe("ProtectedRoute entry redirect", () => {
  it("sends visitors on the root to the landing page", () => {
    renderAt("/", auth({}))
    expect(screen.getByRole("heading", { level: 1 })).toBeTruthy()
  })

  it("sends visitors on a deep link straight to login", () => {
    renderAt("/schedule", auth({}))
    expect(screen.getByText("login page")).toBeTruthy()
  })
})

describe("professionals gallery", () => {
  const gallery = () => screen.getByRole("group", { name: /filtrar por categoria/i }).closest("section") as HTMLElement

  it("filters cards by the selected category and marks the chip as pressed", () => {
    renderAt("/welcome", auth({}))
    const chip = within(gallery()).getByRole("button", { name: "Pedicure" })

    fireEvent.click(chip)

    expect(chip.getAttribute("aria-pressed")).toBe("true")
    const cards = within(gallery()).getAllByRole("article")
    expect(cards).toHaveLength(WELCOME_PROFESSIONALS.filter((p) => p.specialty === "Pedicure").length)
  })

  it("shows every professional again when going back to all", () => {
    renderAt("/welcome", auth({}))
    fireEvent.click(within(gallery()).getByRole("button", { name: "Gel" }))
    fireEvent.click(within(gallery()).getByRole("button", { name: ALL_CATEGORIES }))

    expect(within(gallery()).getAllByRole("article")).toHaveLength(WELCOME_PROFESSIONALS.length)
  })
})

describe("filterProfessionals", () => {
  const sample: WelcomeProfessional[] = [
    { name: "A", specialty: "Manicure", rating: "5.0", image: "a.webp" },
    { name: "B", specialty: "Gel", rating: "4.9", image: "b.webp" },
    { name: "C", specialty: "Manicure", rating: "4.8", image: "c.webp" },
  ]

  it("returns the same list for all categories", () => {
    expect(filterProfessionals(sample, ALL_CATEGORIES)).toEqual(sample)
  })

  it("keeps only the matching specialty", () => {
    expect(filterProfessionals(sample, "Manicure").map((p) => p.name)).toEqual(["A", "C"])
  })

  it("returns an empty list when nobody matches", () => {
    expect(filterProfessionals(sample, "Alongamento")).toEqual([])
  })

  it("handles an empty input", () => {
    expect(filterProfessionals([], "Gel")).toEqual([])
  })
})
