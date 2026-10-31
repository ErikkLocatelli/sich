import type { ReactNode } from "react";
import PageHeader from "../../commons/PageHeader";

const ProfilePageLayout = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="min-h-dvh w-full bg-background animateLeft">
      <PageHeader text={title} backTo="/profile" backLabel="Voltar ao perfil" className="w-full" />
    {children}
  </section>
);

export default ProfilePageLayout;
