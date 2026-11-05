import type { TimelineBlock } from "@/services/schedule/dayTimeline"

// Shared by the mobile day timeline and the desktop week grid so both read the same
export const timelineBlockStyles: Record<TimelineBlock["type"], string> = {
  appointment: "border-sich-magenta/30 bg-sich-magenta/5",
  break: "border-sich-border bg-sich-surface",
  free: "border-dashed border-gray-300 bg-transparent",
}

export const timelineBlockLabels: Record<TimelineBlock["type"], string> = {
  appointment: "Atendimento confirmado",
  free: "Livre",
  break: "Pausa",
}
