import { useState } from 'react'
import { useParams } from 'react-router-dom'

import useHead from '../../hooks/useHead'
import { useAppointmentDetails } from '../../hooks/schedule/useAppointmentDetails'
import { shortDateTime, toLocalDateTime } from '../../services/schedule/agendaDates'
import { timeOf } from '../../services/schedule/dayTimeline'
import { formatCurrency, formatDuration } from '../../services/schedule/formatters'
import { appointmentState, canCancel, formatAddress, whatsappUrl } from '../../services/schedule/appointmentDetails'

import PageHeader from '../../components/commons/PageHeader'
import Card from '../../components/commons/Card'
import SubTitle from '../../components/commons/SubTitle'
import AppointmentStatusBadge from '../../components/pages/schedule/AppointmentStatusBadge'
import AppointmentDetailsSkeleton from '../../components/pages/schedule/AppointmentDetailsSkeleton'

import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { Toaster } from '../../components/ui/toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog'

import { CalendarX2, MapPin, MessageCircle, NotebookPen, Phone, UserRound } from 'lucide-react'

const AppointmentDetails = () => {
  useHead("Detalhes do atendimento", "Veja os detalhes do atendimento na SICH")
  const { id } = useParams()
  const [now] = useState(() => toLocalDateTime(new Date()))
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { appointment, loading, notFound, canceling, cancel } = useAppointmentDetails(Number(id))

  if (loading || (!appointment && !notFound)) {
    return (
      <section className="w-full animateRight">
        <PageHeader text="Detalhes do atendimento" />
        <AppointmentDetailsSkeleton />
      </section>
    )
  }

  if (!appointment) {
    return (
      <section className="w-full animateRight">
        <PageHeader text="Detalhes do atendimento" />
        <p className="mt-10 px-6 text-center text-[11px] text-muted-foreground">Atendimento não encontrado.</p>
        <Toaster />
      </section>
    )
  }

  const state = appointmentState(appointment, now)
  const services = appointment.items.map((item) => item.name).join(" + ")
  const address = formatAddress(appointment.customerAddress)
  const whatsapp = whatsappUrl(appointment.customerPhone)
  const registered = appointment.customerId !== null

  return (
    <section className="w-full pb-6 animateRight">
      <PageHeader text="Detalhes do atendimento" />

      <div className="flex flex-col gap-4 px-6 mt-4">
        <Card className={`p-4 ${state === "canceled" ? "opacity-60" : ""}`}>
          <div className="flex flex-row items-center gap-3">
            <div className="size-14 shrink-0 text-[#A01F6B] bg-[#FDE7F0] flex items-center justify-center rounded-[14px] font-semibold">{timeOf(appointment.startAt)}</div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex w-full items-center justify-between gap-2">
                <span className="font-medium text-sm truncate">{services}</span>
                <AppointmentStatusBadge state={state} />
              </div>
              <span className="text-[11px] text-sich-label">
                {shortDateTime(appointment.startAt)}–{timeOf(appointment.endAt)} · {formatDuration(appointment.durationMinutes)}
              </span>
              <span className="text-[11px] text-sich-label">
                {appointment.origin === "PROVIDER" ? "Agendado por você" : "Agendado pelo cliente"}
              </span>
            </div>
          </div>

          {state === "canceled" && appointment.canceledAt && (
            <p className="mt-3 text-[11px] text-sich-label">
              Cancelado {appointment.canceledBy === "PROVIDER" ? "por você" : "pelo cliente"} em{" "}
              {new Date(appointment.canceledAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
            </p>
          )}
        </Card>

        <Card className="p-4">
          <SubTitle text="Cliente" />
          <div className="mt-3 flex flex-col gap-2 *:flex *:items-center *:gap-2 *:text-[12px]">
            <div>
              <UserRound className="size-4 shrink-0 text-sich-label" />
              <span className="font-medium">{appointment.customerName}</span>
              {!registered && <span className="text-[11px] text-sich-label">· sem cadastro</span>}
            </div>
            {appointment.customerPhone && (
              <div>
                <Phone className="size-4 shrink-0 text-sich-label" />
                <span className="text-[11px] text-sich-label">{appointment.customerPhone}</span>
              </div>
            )}
            {address && (
              <div>
                <MapPin className="size-4 shrink-0 text-sich-label" />
                <span className="text-[11px] text-sich-label">{address}</span>
              </div>
            )}
          </div>

          {whatsapp && (
            <Button
              nativeButton={false}
              render={<a href={whatsapp} target="_blank" rel="noreferrer" />}
              className="w-full mt-4 rounded-[12px] p-4 text-[12px] font-semibold shadow-sich-button"
            >
              <MessageCircle data-icon="inline-start" />
              Conversar no WhatsApp
            </Button>
          )}
        </Card>

        <Card className="p-4">
          <SubTitle text="Serviços" />
          <div className="mt-3 flex flex-col gap-2">
            {appointment.items.map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex items-center justify-between gap-2 text-[12px]">
                <div className="flex min-w-0 flex-col">
                  <span className="font-medium truncate">{item.name}</span>
                  <span className="text-[11px] text-sich-label">{formatDuration(item.durationMinutes)}</span>
                </div>
                <span className="whitespace-nowrap">{formatCurrency(item.price)}</span>
              </div>
            ))}
            <Separator className="my-1" />
            <div className="flex items-center justify-between text-[13px] font-semibold">
              <span>Total</span>
              <span className={state === "canceled" ? "text-sich-label line-through" : "text-(--sich-primary)"}>
                {formatCurrency(appointment.totalPrice)}
              </span>
            </div>
          </div>
        </Card>

        {appointment.notes && (
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <NotebookPen className="size-4 text-sich-label" />
              <SubTitle text="Observações" />
            </div>
            <p className="mt-2 text-[12px] text-sich-label whitespace-pre-line">{appointment.notes}</p>
          </Card>
        )}

        {canCancel(appointment, now) && (
          <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <AlertDialogTrigger
              render={
                <Button type="button" disabled={canceling} className="text-[12px] font-semibold py-5 px-8 text-sich-magenta shadow-sich-small bg-white hover:bg-white" />
              }
            >
              {canceling ? <Spinner data-icon="inline-start" /> : <CalendarX2 data-icon="inline-start" />}
              Cancelar atendimento
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Cancelar atendimento?</AlertDialogTitle>
                <AlertDialogDescription>
                  O atendimento de {appointment.customerName} em {shortDateTime(appointment.startAt)} será cancelado e o horário ficará livre na agenda.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Voltar</AlertDialogCancel>
                <AlertDialogAction onClick={() => { setConfirmOpen(false); cancel() }}>Cancelar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <Toaster />
    </section>
  )
}

export default AppointmentDetails
