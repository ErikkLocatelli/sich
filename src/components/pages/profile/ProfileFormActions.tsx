import { Link } from "react-router-dom";

import { Button } from "../../ui/button";
import { Spinner } from "../../ui/spinner";
import { cn } from "../../../lib/utils";
import type { ProfileVariant } from "./profileMenu";

type ProfileFormActionsProps = {
  submitLabel: string;
  disabled: boolean;
  pending: boolean;
  variant?: ProfileVariant;
  className?: string;
};

const styles = {
  mobile: { root: "mt-6", button: "min-w-0 flex-1" },
  desktop: { root: "justify-end", button: "min-w-36 px-6" },
};

/** Cancel (back to the profile) and submit buttons of the profile forms. */
const ProfileFormActions = ({ submitLabel, disabled, pending, variant = "mobile", className }: ProfileFormActionsProps) => {
  const style = styles[variant];

  return (
    <div className={cn("flex gap-2", style.root, className)}>
      <Button
        render={<Link to="/profile" />}
        nativeButton={false}
        variant="outline"
        className={cn("h-11.5 rounded-[16px] border-sich-border bg-white text-[12px] font-semibold text-sich-magenta", style.button)}
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        disabled={disabled}
        className={cn("h-11.5 gap-1.5 rounded-[16px] bg-sich-gradient text-[12px] font-semibold text-white shadow-sich-button", style.button)}
      >
        {pending && <Spinner className="size-3.5" />}
        {submitLabel}
      </Button>
    </div>
  );
};

export default ProfileFormActions;
