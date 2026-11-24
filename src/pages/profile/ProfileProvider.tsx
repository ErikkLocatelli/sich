import type { UserDataProvider } from "../../models/userData";
import { useProviderProfileStats } from "../../hooks/profile/useProfileStats";
import ProfileView from "../../components/pages/profile/ProfileView";

type ProfileProviderProps = {
  data: UserDataProvider;
  userLogout: () => void;
};

const ProfileProvider = ({ data, userLogout }: ProfileProviderProps) => {
  const stats = useProviderProfileStats();

  return (
    <ProfileView data={data} stats={stats} sincePrefix="Profissional desde" ariaLabel="Perfil do profissional" userLogout={userLogout} />
  );
};

export default ProfileProvider;
