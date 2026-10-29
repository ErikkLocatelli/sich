import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const ProfilePageLayout = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="min-h-dvh w-full bg-background animateLeft">
    <header className="flex h-40 items-end bg-white px-5 pb-5">
      <div className="flex items-center gap-3">
        <Link to="/profile" aria-label="Voltar ao perfil" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f0f0f5] focus-visible:outline-2 focus-visible:outline-sich-magenta">
          <MoveLeft aria-hidden="true" className="size-4.5 text-sich-heading" />
        </Link>
        <h1 className="text-[18px] font-semibold text-sich-heading">{title}</h1>
      </div>
    </header>
    {children}
  </section>
);

export default ProfilePageLayout;
