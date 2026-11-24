import type { FormEventHandler, ReactNode } from "react";

import Card from "../../commons/Card";
import SubTitle from "../../commons/SubTitle";

type ProfileFormCardProps = {
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
};

/** Desktop wrapper of the profile forms: titled card aligned with the page gutter. */
const ProfileFormCard = ({ title, onSubmit, children }: ProfileFormCardProps) => (
  <form noValidate onSubmit={onSubmit} className="px-10">
    <Card className="flex max-w-3xl flex-col gap-6 border border-sich-border p-5.5">
      <SubTitle text={title} className="text-sich-heading" />
      {children}
    </Card>
  </form>
);

export default ProfileFormCard;
