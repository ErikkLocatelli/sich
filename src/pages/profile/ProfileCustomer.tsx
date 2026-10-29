import type { UserData } from "../../models/userData";
import {
  CircleHelp,
  KeyRound,
  LogOut,
  MapPin,
  UserRound,
} from "lucide-react";
import ProfileHeader from "../../components/pages/profile/ProfileHeader";
import ProfileStats from "../../components/pages/profile/ProfileStats";
import ProfileMenuSection from "../../components/pages/profile/ProfileMenuSection";
import ProfileFavorites from "../../components/pages/profile/ProfileFavorites";
import { Button } from "../../components/ui/button";

type ProfileCustomerProps = {
  data: Pick<UserData, "name" | "email">;
  userLogout: () => void;
};

const accountItems = [
  { label: "Alterar endereço", icon: MapPin, to: "/profile/address" },
  { label: "Redefinir senha", icon: KeyRound, to: "/profile/password" },
  { label: "Meus dados", icon: UserRound },
  { label: "Ajuda e suporte", icon: CircleHelp },
];

const ProfileCustomer = ({ data, userLogout }: ProfileCustomerProps) => {
  return (
    <section
      aria-label="Perfil do cliente"
      className="min-h-dvh w-full bg-background animateRight"
    >
      <ProfileHeader name={data.name} email={data.email} />
      <ProfileStats />

      <div className="px-5 pt-4.5 pb-5">
        <ProfileMenuSection title="Conta" items={accountItems} />
        <ProfileFavorites />

        <Button
          type="button"
          variant="outline"
          onClick={userLogout}
          className="mt-7 h-11.5 gap-1 rounded-[16px] border-red-500/30 bg-transparent px-3 text-[13px] font-semibold text-red-500 hover:bg-red-500/5 hover:text-red-500"
        >
          <LogOut aria-hidden="true" className="size-3.5" />
          Sair da conta
        </Button>
      </div>
    </section>
  );
};

export default ProfileCustomer;
