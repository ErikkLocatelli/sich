import { useState } from "react";
import { Camera, ImageUp, Trash2 } from "lucide-react";

import { useProfilePhoto } from "../../../hooks/profile/useProfilePhoto";
import { PHOTO_ACCEPT } from "../../../services/profile/profilePhoto";
import Avatar from "../../commons/Avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Spinner } from "../../ui/spinner";
import { cn } from "../../../lib/utils";

type ProfilePhotoPickerProps = {
  name: string;
  photo: string | null;
  size?: "md" | "lg";
};

const sizeStyles = {
  md: {
    radius: "rounded-[18px]",
    avatar: "size-16 [&>span]:text-[18px]",
    badge: "size-6 [&>svg]:size-3",
    spinner: "size-5",
  },
  lg: {
    radius: "rounded-[28px]",
    avatar: "size-24 [&>span]:text-[30px]",
    badge: "size-7.5 [&>svg]:size-3.5",
    spinner: "size-6",
  },
};

const optionClassName =
  "flex w-full items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-left text-[12px] text-sich-heading transition-colors hover:bg-sich-magenta/5 focus-visible:outline-2 focus-visible:outline-sich-magenta";

/** Profile avatar that opens the photo options (change, remove). */
const ProfilePhotoPicker = ({ name, photo, size = "md" }: ProfilePhotoPickerProps) => {
  const styles = sizeStyles[size];
  const [open, setOpen] = useState(false);
  const { inputRef, pick, handleFile, remove, busy } = useProfilePhoto();

  const choose = (action: () => void) => () => {
    setOpen(false);
    action();
  };

  return (
    <div className="relative shrink-0">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          disabled={busy}
          aria-label={photo ? "Alterar ou remover foto de perfil" : "Adicionar foto de perfil"}
          className={cn("relative block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white", styles.radius)}
        >
          <Avatar
            name={name}
            url={photo}
            className={cn("bg-white shadow-sich-button [&>span]:font-bold [&>span]:text-sich-magenta", styles.radius, styles.avatar)}
          />
          {busy && (
            <span className={cn("absolute inset-0 flex items-center justify-center bg-black/35", styles.radius)}>
              <Spinner className={cn("text-white", styles.spinner)} />
            </span>
          )}
          <span
            aria-hidden="true"
            className={cn("absolute -right-1 -bottom-1 flex items-center justify-center rounded-full border-2 border-white bg-sich-magenta text-white", styles.badge)}
          >
            <Camera />
          </span>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={8}
          aria-label="Foto de perfil"
          className="w-48 gap-0.5 rounded-[16px] border border-sich-border p-1.5 shadow-sich-small-card ring-0"
        >
          <button type="button" onClick={choose(pick)} className={optionClassName}>
            <ImageUp aria-hidden="true" className="size-4 text-sich-magenta" />
            {photo ? "Alterar foto" : "Adicionar foto"}
          </button>
          {photo && (
            <button type="button" onClick={choose(remove)} className={`${optionClassName} text-red-500`}>
              <Trash2 aria-hidden="true" className="size-4" />
              Remover foto
            </button>
          )}
        </PopoverContent>
      </Popover>

      <input
        ref={inputRef}
        type="file"
        accept={PHOTO_ACCEPT}
        onChange={handleFile}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
};

export default ProfilePhotoPicker;
