import { CircleHelp, KeyRound, MapPin, UserRound } from "lucide-react";

/** Same account options for customers and providers, on mobile and desktop. */
export const accountMenuItems = [
  { label: "Meus dados", description: "Nome, CPF e telefone", icon: UserRound, to: "/profile/data" },
  { label: "Alterar endereço", description: "Rua, número e CEP", icon: MapPin, to: "/profile/address" },
  { label: "Redefinir senha", description: "Altere sua senha de acesso", icon: KeyRound, to: "/profile/password" },
  { label: "Ajuda e suporte", description: "Tire suas dúvidas", icon: CircleHelp },
];

export const PROFILE_COPY = {
  subtitle: "Gerencie sua conta e preferências",
};

/** Heading of the desktop cards (same scale as `SubTitle`). */
export const profileCardTitleClass = "pb-4 text-[15px] font-medium text-sich-heading";

export type ProfileVariant = "mobile" | "desktop";
