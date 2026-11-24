import { useContext } from "react";

import { userContext } from "../../services/userContext";
import useHead from "../../hooks/useHead";
import { useIsDesktop } from "../../hooks/useMedia";
import { useProfilePasswordPage } from "../../hooks/profile/useProfilePasswordPage";

import ProfilePasswordDesktop from "./ProfilePasswordDesktop";
import ProfilePasswordMobile from "./ProfilePasswordMobile";

const ProfilePasswordScreen = () => {
  const isDesktop = useIsDesktop();
  const state = useProfilePasswordPage();

  return isDesktop ? <ProfilePasswordDesktop state={state} /> : <ProfilePasswordMobile state={state} />;
};

const ProfilePassword = () => {
  useHead("Redefinir senha", "Altere a senha da sua conta SICH");
  const { data } = useContext(userContext);

  if (!data) return null;

  return <ProfilePasswordScreen />;
};

export default ProfilePassword;
