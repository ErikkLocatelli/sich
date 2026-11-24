import { CircleHelp, KeyRound, MapPin, UserRound } from "lucide-react";

/** Same account options for customers and providers. */
export const accountMenuItems = [
  { label: "Meus dados", icon: UserRound, to: "/profile/data" },
  { label: "Alterar endereço", icon: MapPin, to: "/profile/address" },
  { label: "Redefinir senha", icon: KeyRound, to: "/profile/password" },
  { label: "Ajuda e suporte", icon: CircleHelp },
];
