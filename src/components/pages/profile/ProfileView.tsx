import type { ReactNode } from "react";
import { LogOut } from "lucide-react";

import type { AnyUserData } from "../../../models/userData";
import type { ProfileStat } from "../../../services/profile/profileStats";
import { sinceYear } from "../../../services/profile/profileFormat";
import { Button } from "../../ui/button";

import ProfileHeader from "./ProfileHeader";
import ProfileMenuSection from "./ProfileMenuSection";
import ProfileStats from "./ProfileStats";
import { accountMenuItems } from "./profileMenu";

type ProfileViewProps = {
  data: AnyUserData;
  stats: ProfileStat[];
  /** "Cliente desde" / "Profissional desde" */
  sincePrefix: string;
  ariaLabel: string;
  userLogout: () => void;
  children?: ReactNode;
};

/** Profile layout shared by customers and providers; `children` goes between the menu and the logout. */
const ProfileView = ({ data, stats, sincePrefix, ariaLabel, userLogout, children }: ProfileViewProps) => {
  const year = sinceYear(data.createdAt);

  return (
    <section aria-label={ariaLabel} className="w-full bg-background animateRight">
      <ProfileHeader
        name={data.name}
        email={data.email}
        photo={data.photo}
        sinceLabel={year ? `${sincePrefix} ${year}` : null}
      />
      <ProfileStats stats={stats} />

      <div className="px-5 pt-4.5 pb-5">
        <ProfileMenuSection title="Conta" items={accountMenuItems} />
        {children}

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

export default ProfileView;
