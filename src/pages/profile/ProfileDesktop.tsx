import type { ProfileState } from "../../hooks/profile/useProfile";
import Title from "../../components/commons/Title";
import ProfileFavorites from "../../components/pages/profile/ProfileFavorites";
import ProfileHeader from "../../components/pages/profile/ProfileHeader";
import ProfileLogoutButton from "../../components/pages/profile/ProfileLogoutButton";
import ProfileMenuSection from "../../components/pages/profile/ProfileMenuSection";
import ProfileStats from "../../components/pages/profile/ProfileStats";
import { PROFILE_COPY, accountMenuItems } from "../../components/pages/profile/profileMenu";

const ProfileDesktop = ({ state }: { state: ProfileState }) => {
  const { ariaLabel, header, stats, isCustomer, userLogout } = state;

  return (
    <section aria-label={ariaLabel} className="flex w-full flex-col gap-6 px-10 py-8 animateRight">
      <header className="flex flex-col gap-1">
        <Title text="Perfil" className="lg:text-left lg:text-[26px] lg:font-bold lg:tracking-[-0.4px]" />
        <span className="text-[13px] text-sich-label">{PROFILE_COPY.subtitle}</span>
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)_360px] items-start gap-6">
        <div className="flex flex-col gap-6">
          <ProfileHeader {...header} variant="desktop" />
          <ProfileMenuSection title="Conta" items={accountMenuItems} variant="desktop" />
          <ProfileLogoutButton onClick={userLogout} className="self-start px-5.5" />
        </div>

        <div className="flex flex-col gap-6">
          <ProfileStats stats={stats} variant="desktop" />
          {isCustomer && <ProfileFavorites variant="desktop" />}
        </div>
      </div>
    </section>
  );
};

export default ProfileDesktop;
