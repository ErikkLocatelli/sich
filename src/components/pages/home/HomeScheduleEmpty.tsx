import Card from "../../commons/Card"
import SubTitle from "@/components/commons/SubTitle"

const MESSAGES = {
  rest: {
    title: "Hoje é seu dia de descanso",
    description: "Não há expediente cadastrado para hoje. Aproveite para recarregar as energias!"
  },
  empty: {
    title: "Nenhum atendimento por hoje",
    description: "Não há serviços agendados para o restante do dia. Os novos agendamentos aparecem aqui."
  }
}

/** Skeleton of the appointment card, shown when today has nothing left to attend. */
const HomeScheduleEmpty = ({ isRestDay, className }: { isRestDay: boolean; className?: string }) => {
  const message = isRestDay ? MESSAGES.rest : MESSAGES.empty

  return (
    <Card className={`p-4 ${className || ""}`}>
        <div className="rounded-2xl bg-[#f7f7f7] p-4">
            <div className="flex flex-row items-center gap-3">
                <div className="size-14 shrink-0 rounded-[14px] bg-[#e9e9e9]" />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex w-full items-center justify-between gap-2">
                        <div className="h-3 w-32 rounded bg-[#e9e9e9]" />
                        <div className="h-4 w-14 rounded-full bg-[#e9e9e9]" />
                    </div>
                    <div className="h-2.5 w-20 rounded bg-[#e9e9e9]" />
                    <div className="flex gap-3">
                        <div className="h-2.5 w-14 rounded bg-[#e9e9e9]" />
                        <div className="h-2.5 w-24 rounded bg-[#e9e9e9]" />
                    </div>
                </div>
            </div>
            <div className="mt-4 h-8 w-full rounded-[12px] bg-[#e9e9e9]" />
        </div>

        <div className="mt-4 flex flex-col items-center gap-1 text-center">
            <SubTitle text={message.title} />
            <p className="text-[11px] text-muted-foreground">{message.description}</p>
        </div>
    </Card>
  )
}

export default HomeScheduleEmpty
