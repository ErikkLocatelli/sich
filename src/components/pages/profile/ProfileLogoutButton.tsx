import { LogOut } from "lucide-react";

import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";

const ProfileLogoutButton = ({ onClick, className }: { onClick: () => void; className?: string }) => (
  <Button
    type="button"
    variant="outline"
    onClick={onClick}
    className={cn(
      "h-11.5 gap-1 rounded-[16px] border-red-500/30 bg-transparent px-3 text-[13px] font-semibold text-red-500 hover:bg-red-500/5 hover:text-red-500",
      className,
    )}
  >
    <LogOut aria-hidden="true" className="size-3.5" />
    Sair da conta
  </Button>
);

export default ProfileLogoutButton;
