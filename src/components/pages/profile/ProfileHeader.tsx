import { Star } from "lucide-react";

import ProfilePhotoPicker from "./ProfilePhotoPicker";

type ProfileHeaderProps = {
  name?: string | null;
  email?: string | null;
  photo: string | null;
  /** e.g. "Cliente desde 2024"; hidden when null */
  sinceLabel: string | null;
};

const ProfileHeader = ({ name, email, photo, sinceLabel }: ProfileHeaderProps) => {
  const displayName = name?.trim() || "Valor não encontrado";
  const displayEmail = email?.trim() || "Valor não encontrado";
  const avatarName = name?.trim().replace(/\s+/g, " ") || "?";

  return (
    <header className="bg-sich-gradient px-5 pt-20 pb-20 text-white">
      <div className="flex min-h-16 items-center gap-3.5">
        <ProfilePhotoPicker name={avatarName} photo={photo} />

        <div className="min-w-0 flex-1 wrap:anywhere">
          <h1 className="text-[17px] leading-normal font-semibold">
            {displayName}
          </h1>
          <p className="text-[11px] leading-normal">{displayEmail}</p>
          {sinceLabel && (
            <p className="mt-1 flex items-start gap-1 text-[10px] leading-normal text-white/85">
              <Star
                aria-hidden="true"
                className="mt-0.5 size-2.5 shrink-0 fill-current"
              />
              <span>{sinceLabel}</span>
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
