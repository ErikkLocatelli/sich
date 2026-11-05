import { useEffect, useRef, useState } from 'react'

import useHead from '../../hooks/useHead'
import { useHistoryFeed } from '../../hooks/schedule/useHistoryFeed'
import { monthTitle, subtractMonths, toIsoDate } from '../../services/schedule/agendaDates'
import type { AppointmentResponse } from '../../api/schedule/appointments'

import PageHeader from '../../components/commons/PageHeader'
import Card from '../../components/commons/Card'
import SubTitle from '../../components/commons/SubTitle'
import ScheduleHistory from '../../components/pages/schedule/ScheduleHistory'
import ScheduleHistorySkeleton from '../../components/pages/schedule/ScheduleHistorySkeleton'
import { Toaster } from '../../components/ui/toast'

import { Info } from 'lucide-react'

const PAGE_SIZE = 20
const MONTHS_BACK = 3

/** Groups the (newest first) list by "yyyy-MM", keeping the order. */
const groupByMonth = (appointments: AppointmentResponse[]) =>
  appointments.reduce<{ month: string; items: AppointmentResponse[] }[]>((groups, appointment) => {
    const month = appointment.startAt.slice(0, 7)
    const last = groups[groups.length - 1]

    if (last?.month === month) last.items.push(appointment)
    else groups.push({ month, items: [appointment] })

    return groups
  }, [])

const ScheduleHistoryAll = () => {
  useHead("Histórico", "Veja seus atendimentos dos últimos meses na SICH")
  const [since] = useState(() => toIsoDate(subtractMonths(new Date(), MONTHS_BACK)))
  const { appointments, hasMore, loading, loaded, loadMore } = useHistoryFeed(since, PAGE_SIZE)
  const sentinel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = sentinel.current
    if (!target || !hasMore) return

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore() },
      { rootMargin: "200px" }
    )
    observer.observe(target)

    return () => observer.disconnect()
    // Re-observing after each page fires the callback again if the sentinel is
    // still on screen (short lists), so loading doesn't stall.
  }, [hasMore, loadMore, loaded, appointments.length])

  const groups = groupByMonth(appointments)

  return (
    <section className="w-full pb-6 animateRight">
      <PageHeader text="Histórico" />

      <div className="flex flex-col gap-4 px-6 mt-4">
        <div className="flex items-center gap-2 rounded-[12px] bg-sich-surface px-3 py-2.5 text-[11px] text-sich-label">
          <Info className="size-3.5 shrink-0" />
          <span>Mostrando os atendimentos dos últimos {MONTHS_BACK} meses.</span>
        </div>

        {!loaded && (
          <Card className="px-3 py-4">
            <ScheduleHistorySkeleton rows={6} />
          </Card>
        )}

        {loaded && groups.length === 0 && (
          <p className="mt-6 text-center text-[11px] text-black/20">Nenhum atendimento nos últimos {MONTHS_BACK} meses</p>
        )}

        {groups.map((group) => (
          <Card key={group.month} className="px-3 py-4">
            <SubTitle text={monthTitle(group.month)} />
            <div className="divide-y divide-gray-200">
              {group.items.map((appointment) => (
                <ScheduleHistory key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </Card>
        ))}

        {loaded && loading && (
          <Card className="px-3 py-4">
            <ScheduleHistorySkeleton />
          </Card>
        )}

        <div ref={sentinel} aria-hidden="true" />
      </div>

      <Toaster />
    </section>
  )
}

export default ScheduleHistoryAll
