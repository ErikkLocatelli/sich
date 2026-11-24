import type { UserData } from "../../models/userData";
import { useCustomerProfileStats } from "../../hooks/profile/useProfileStats";
import ProfileView from "../../components/pages/profile/ProfileView";
import ProfileFavorites from "../../components/pages/profile/ProfileFavorites";

type ProfileCustomerProps = {
  data: UserData;
  userLogout: () => void;
};

const ProfileCustomer = ({ data, userLogout }: ProfileCustomerProps) => {
  const stats = useCustomerProfileStats();

  return (
    <ProfileView data={data} stats={stats} sincePrefix="Cliente desde" ariaLabel="Perfil do cliente" userLogout={userLogout}>
      <ProfileFavorites />
    </ProfileView>
  );
};

export default ProfileCustomer;
