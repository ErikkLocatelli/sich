import type { ProfileState } from "../../hooks/profile/useProfile";
import ProfileFavorites from "../../components/pages/profile/ProfileFavorites";
import ProfileHeader from "../../components/pages/profile/ProfileHeader";
import ProfileLogoutButton from "../../components/pages/profile/ProfileLogoutButton";
import ProfileMenuSection from "../../components/pages/profile/ProfileMenuSection";
import ProfileStats from "../../components/pages/profile/ProfileStats";
import { accountMenuItems } from "../../components/pages/profile/profileMenu";

const ProfileMobile = ({ state }: { state: ProfileState }) => {
  const { ariaLabel, header, stats, isCustomer, userLogout } = state;

  return (
    <section aria-label={ariaLabel} className="w-full bg-background animateRight">
      <ProfileHeader {...header} />
      <ProfileStats stats={stats} />

      <div className="px-5 pt-4.5 pb-5">
        <ProfileMenuSection title="Conta" items={accountMenuItems} />
        {isCustomer && <ProfileFavorites />}
        <ProfileLogoutButton onClick={userLogout} className="mt-7" />
      </div>
    </section>
  );
};

export default ProfileMobile;
