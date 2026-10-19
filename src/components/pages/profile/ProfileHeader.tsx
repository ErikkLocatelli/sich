import { Star } from "lucide-react";
import Avatar from "../../commons/Avatar";
import { profileDemoData } from "./profileDemoData";

type ProfileHeaderProps = {
  name?: string | null;
  email?: string | null;
};

const ProfileHeader = ({ name, email }: ProfileHeaderProps) => {
  const displayName = name?.trim() || "Valor não encontrado";
  const displayEmail = email?.trim() || "Valor não encontrado";
  const avatarName = name?.trim().replace(/\s+/g, " ") || "?";

  return (
    <header className="bg-sich-gradient px-5 pt-20 pb-20 text-white">
      <div className="flex min-h-16 items-center gap-3.5">
        <div aria-hidden="true" className="shrink-0">
          <Avatar
            name={avatarName}
            className="size-16 rounded-[18px] bg-white shadow-sich-button [&>span]:text-[18px] [&>span]:font-bold [&>span]:text-sich-magenta"
          />
        </div>

        <div className="min-w-0 flex-1 wrap:anywhere">
          <h1 className="text-[17px] leading-normal font-semibold">
            {displayName}
          </h1>
          <p className="text-[11px] leading-normal">{displayEmail}</p>
          <p className="mt-1 flex items-start gap-1 text-[10px] leading-normal text-white/85">
            <Star
              aria-hidden="true"
              className="mt-0.5 size-2.5 shrink-0 fill-current"
            />
            <span>
              Cliente desde {profileDemoData.customerSince} ·{" "}
              {profileDemoData.appointments} atendimentos
            </span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
