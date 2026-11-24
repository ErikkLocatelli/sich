import { Star } from "lucide-react";

import { cn } from "../../../lib/utils";
import type { ProfileVariant } from "./profileMenu";
import ProfilePhotoPicker from "./ProfilePhotoPicker";

type ProfileHeaderProps = {
  name?: string | null;
  /** "email · phone"; falls back to a placeholder when empty */
  contact: string;
  photo: string | null;
  /** e.g. "Cliente desde 2024"; hidden when null */
  sinceLabel: string | null;
  variant?: ProfileVariant;
};

const styles = {
  mobile: {
    root: "bg-sich-gradient px-5 pt-20 pb-20",
    row: "min-h-16 gap-3.5",
    name: "text-[17px] font-semibold",
    contact: "text-[11px]",
    since: "mt-1 gap-1 text-[10px] text-white/85",
    star: "mt-0.5 size-2.5",
  },
  desktop: {
    root: "overflow-hidden rounded-[24px] bg-sich-gradient px-9 py-8",
    row: "min-h-24 gap-6",
    name: "text-[28px] font-bold tracking-[-0.5px]",
    contact: "mt-1.5 text-[13px] text-white/90",
    since: "mt-3 gap-1.5 text-[13px]",
    star: "mt-1 size-3",
  },
};

const ProfileHeader = ({ name, contact, photo, sinceLabel, variant = "mobile" }: ProfileHeaderProps) => {
  const style = styles[variant];
  const displayName = name?.trim() || "Valor não encontrado";
  const avatarName = name?.trim().replace(/\s+/g, " ") || "?";

  return (
    <header className={cn("text-white", style.root)}>
      <div className={cn("flex items-center", style.row)}>
        <ProfilePhotoPicker name={avatarName} photo={photo} size={variant === "desktop" ? "lg" : "md"} />

        <div className="min-w-0 flex-1 wrap-anywhere">
          <h1 className={cn("leading-normal", style.name)}>{displayName}</h1>
          <p className={cn("leading-normal", style.contact)}>{contact || "Valor não encontrado"}</p>
          {sinceLabel && (
            <p className={cn("flex items-start leading-normal", style.since)}>
              <Star aria-hidden="true" className={cn("shrink-0 fill-current", style.star)} />
              <span>{sinceLabel}</span>
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
