import { useState } from "react";
import { Camera, ImageUp, Trash2 } from "lucide-react";

import { useProfilePhoto } from "../../../hooks/profile/useProfilePhoto";
import { PHOTO_ACCEPT } from "../../../services/profile/profilePhoto";
import Avatar from "../../commons/Avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Spinner } from "../../ui/spinner";

type ProfilePhotoPickerProps = {
  name: string;
  photo: string | null;
};

const optionClassName =
  "flex w-full items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-left text-[12px] text-sich-heading transition-colors hover:bg-sich-magenta/5 focus-visible:outline-2 focus-visible:outline-sich-magenta";

/** Profile avatar that opens the photo options (change, remove). */
const ProfilePhotoPicker = ({ name, photo }: ProfilePhotoPickerProps) => {
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
          className="relative block rounded-[18px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Avatar
            name={name}
            url={photo}
            className="size-16 rounded-[18px] bg-white shadow-sich-button [&>span]:text-[18px] [&>span]:font-bold [&>span]:text-sich-magenta"
          />
          {busy && (
            <span className="absolute inset-0 flex items-center justify-center rounded-[18px] bg-black/35">
              <Spinner className="size-5 text-white" />
            </span>
          )}
          <span
            aria-hidden="true"
            className="absolute -right-1 -bottom-1 flex size-6 items-center justify-center rounded-full border-2 border-white bg-sich-magenta text-white"
          >
            <Camera className="size-3" />
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
