import type { ReactNode } from "react";

import PageHeader from "../../commons/PageHeader";
import { cn } from "../../../lib/utils";
import type { ProfileVariant } from "./profileMenu";

type ProfilePageLayoutProps = {
  title: string;
  children: ReactNode;
  variant?: ProfileVariant;
};

const styles = {
  mobile: { root: "w-full bg-background", header: "w-full" },
  // Desktop keeps the layout background and the same px-10 gutter as the profile
  desktop: { root: "flex w-full flex-col gap-6 pb-8", header: "px-10" },
};

const ProfilePageLayout = ({ title, children, variant = "mobile" }: ProfilePageLayoutProps) => {
  const style = styles[variant];

  return (
    <section className={cn("animateLeft", style.root)}>
      <PageHeader text={title} backTo="/profile" backLabel="Voltar ao perfil" className={style.header} />
      {children}
    </section>
  );
};

export default ProfilePageLayout;
