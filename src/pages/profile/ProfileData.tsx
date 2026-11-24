import { useContext } from "react";

import type { AnyUserData } from "../../models/userData";
import { userContext } from "../../services/userContext";
import useHead from "../../hooks/useHead";
import { useIsDesktop } from "../../hooks/useMedia";
import { useProfileDataPage } from "../../hooks/profile/useProfileDataPage";

import ProfileDataDesktop from "./ProfileDataDesktop";
import ProfileDataMobile from "./ProfileDataMobile";

const ProfileDataScreen = ({ initial }: { initial: AnyUserData }) => {
  const isDesktop = useIsDesktop();
  const state = useProfileDataPage(initial);

  return isDesktop ? <ProfileDataDesktop state={state} /> : <ProfileDataMobile state={state} />;
};

const ProfileData = () => {
  useHead("Meus dados", "Atualize seus dados pessoais na SICH");
  const { data } = useContext(userContext);

  if (!data) return null;

  return <ProfileDataScreen initial={data} />;
};

export default ProfileData;
