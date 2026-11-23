import { createLucideIcon, type IconNode } from "lucide-react"

// Custom service icons following Lucide guidelines:
// 24x24 grid, 1px padding, 2px stroke, round caps/joins, no fills.
// Built with createLucideIcon so they accept the same props as any lucide-react icon.

/** Unha (genérico) */
const nailNode: IconNode = [
  ["path", { d: "M6 22V8a6 6 0 0 1 12 0v14", key: "nail-0" }],
  ["path", { d: "M9 8a3 3 0 0 1 6 0v3a3 3 0 0 1-6 0z", key: "nail-1" }],
]
export const Nail = createLucideIcon("nail", nailNode)

/** Unhas / mãos (categoria, navegação) */
const nailsNode: IconNode = [
  ["path", { d: "M2 22V12a5 5 0 0 1 10 0v10", key: "nails-0" }],
  ["path", { d: "M12 12V7a5 5 0 0 1 10 0v15", key: "nails-1" }],
  ["path", { d: "M5 12a2 2 0 0 1 4 0v2a2 2 0 0 1-4 0z", key: "nails-2" }],
  ["path", { d: "M15 7a2 2 0 0 1 4 0v2a2 2 0 0 1-4 0z", key: "nails-3" }],
]
export const Nails = createLucideIcon("nails", nailsNode)

/** Esmalte */
const nailPolishNode: IconNode = [
  ["path", { d: "M10 2h4a1 1 0 0 1 1 1v6H9V3a1 1 0 0 1 1-1z", key: "nail-polish-0" }],
  ["path", { d: "M8 9h8a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3z", key: "nail-polish-1" }],
  ["path", { d: "M9 13v4", key: "nail-polish-2" }],
]
export const NailPolish = createLucideIcon("nail-polish", nailPolishNode)

/** Esmaltação */
const nailPolishBrushNode: IconNode = [
  ["path", { d: "M3 22v-8a5 5 0 0 1 10 0v8", key: "nail-polish-brush-0" }],
  ["path", { d: "M6 14a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0z", key: "nail-polish-brush-1" }],
  ["path", { d: "M18.5 2.5a1.5 1.5 0 0 1 2.12 0l.88.88a1.5 1.5 0 0 1 0 2.12L18 9l-3-3z", key: "nail-polish-brush-2" }],
  ["path", { d: "m16.5 7.5-2 2", key: "nail-polish-brush-3" }],
  ["path", { d: "M14.5 9.5c-.8.8-1.2 2-.9 2.4.4.3 1.6-.1 2.4-.9", key: "nail-polish-brush-4" }],
]
export const NailPolishBrush = createLucideIcon("nail-polish-brush", nailPolishBrushNode)

/** Manicure */
const manicureNode: IconNode = [
  ["path", { d: "M3 22v-8a5 5 0 0 1 10 0v8", key: "manicure-0" }],
  ["path", { d: "M6 14a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0z", key: "manicure-1" }],
  ["path", { d: "M15.77 19.73 18.27 3.73a1.75 1.75 0 0 1 3.46.54l-2.5 16a1.75 1.75 0 0 1-3.46-.54z", key: "manicure-2" }],
  ["path", { d: "m17.02 11.73 3.46.54", key: "manicure-3" }],
]
export const Manicure = createLucideIcon("manicure", manicureNode)

/** Pedicure */
const pedicureNode: IconNode = [
  ["path", { d: "M5 2v11c-1 1-1.5 2.5-1.5 4.5A3.5 3.5 0 0 0 7 21h12.5a2.5 2.5 0 0 0 0-5H17c-3.5 0-6.3-2-7-5.5V2", key: "pedicure-0" }],
]
export const Pedicure = createLucideIcon("pedicure", pedicureNode)

/** Spa de mãos / hidratação */
const handSpaNode: IconNode = [
  ["path", { d: "M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17", key: "hand-spa-0" }],
  ["path", { d: "m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9", key: "hand-spa-1" }],
  ["path", { d: "m2 16 6 6", key: "hand-spa-2" }],
  ["path", { d: "M16 10.9a2.94 2.94 0 0 0 2.94-2.94c0-0.84-0.42-1.638-1.26-2.31s-1.47-1.68-1.68-2.73c-0.21 1.05-0.84 2.058-1.68 2.73C13.48 6.322 13.06 7.12 13.06 7.96a2.94 2.94 0 0 0 2.94 2.94z", key: "hand-spa-3" }],
  ["path", { d: "M6 2v4", key: "hand-spa-4" }],
  ["path", { d: "M8 4H4", key: "hand-spa-5" }],
]
export const HandSpa = createLucideIcon("hand-spa", handSpaNode)

/** Cuidados / tratamento */
const nailCareNode: IconNode = [
  ["path", { d: "M3 22v-8a5 5 0 0 1 10 0v8", key: "nail-care-0" }],
  ["path", { d: "M6 14a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0z", key: "nail-care-1" }],
  ["path", { d: "M14 4.4a2.2 2.2 0 0 1 3.836-1.47 0.224 0.224 0 0 0 0.327 0A2.196 2.196 0 0 1 22 4.4c0 0.916-0.6 1.6-1.2 2.2l-2.197 2.125a0.8 0.8 0 0 1-1.2 0.008L15.2 6.6c-0.6-0.6-1.2-1.28-1.2-2.2", key: "nail-care-2" }],
]
export const NailCare = createLucideIcon("nail-care", nailCareNode)

/** Nail art / decoração */
const nailArtNode: IconNode = [
  ["path", { d: "M3 22v-8a5 5 0 0 1 10 0v8", key: "nail-art-0" }],
  ["path", { d: "M6 14a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0z", key: "nail-art-1" }],
  ["path", { d: "M17.008 1.407a0.5 0.5 0 0 1 0.983 0l0.525 2.779a1 1 0 0 0 0.797 0.797l2.779 0.525a0.5 0.5 0 0 1 0 0.983l-2.779 0.525a1 1 0 0 0-0.797 0.797l-0.525 2.779a0.5 0.5 0 0 1-0.983 0l-0.525-2.779a1 1 0 0 0-0.797-0.797l-2.779-0.525a0.5 0.5 0 0 1 0-0.983l2.779-0.525a1 1 0 0 0 0.797-0.797z", key: "nail-art-2" }],
  ["path", { d: "M20 15v4", key: "nail-art-3" }],
  ["path", { d: "M22 17h-4", key: "nail-art-4" }],
]
export const NailArt = createLucideIcon("nail-art", nailArtNode)

/** Alongamento (gel, fibra, acrílico) */
const nailExtensionNode: IconNode = [
  ["path", { d: "M6 22v-8a6 6 0 0 1 2-4.47", key: "nail-extension-0" }],
  ["path", { d: "M16 9.53A6 6 0 0 1 18 14v8", key: "nail-extension-1" }],
  ["path", { d: "M9 16V9c0-2.5 1.2-5 3-7 1.8 2 3 4.5 3 7v7a3 3 0 0 1-6 0z", key: "nail-extension-2" }],
]
export const NailExtension = createLucideIcon("nail-extension", nailExtensionNode)

/** Gel / cabine UV-LED */
const nailLampNode: IconNode = [
  ["path", { d: "M3 20v-3a9 9 0 0 1 18 0v3", key: "nail-lamp-0" }],
  ["path", { d: "M2 20h20", key: "nail-lamp-1" }],
  ["path", { d: "M8 20v-2a4 4 0 0 1 8 0v2", key: "nail-lamp-2" }],
  ["path", { d: "M12 2v2", key: "nail-lamp-3" }],
  ["path", { d: "m4.2 5.2 1.4 1.4", key: "nail-lamp-4" }],
  ["path", { d: "m18.4 6.6 1.4-1.4", key: "nail-lamp-5" }],
]
export const NailLamp = createLucideIcon("nail-lamp", nailLampNode)

/** Lixa */
const nailFileNode: IconNode = [
  ["path", { d: "M3.59 17.59 6.59 14.59a2 2 0 0 1 2.82 2.82l-3 3a2 2 0 0 1-2.82-2.82z", key: "nail-file-0" }],
  ["path", { d: "M9.59 11.59 19.3 3.3a1 1 0 0 1 1.4 1.4l-8.29 9.71z", key: "nail-file-1" }],
]
export const NailFile = createLucideIcon("nail-file", nailFileNode)
