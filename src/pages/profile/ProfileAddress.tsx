import { useContext } from "react";

import type { InitialAddress } from "../../hooks/profile/useProfileAddressForm";
import { userContext } from "../../services/userContext";
import useHead from "../../hooks/useHead";
import { useIsDesktop } from "../../hooks/useMedia";
import { useProfileAddressPage } from "../../hooks/profile/useProfileAddressPage";

import ProfileAddressDesktop from "./ProfileAddressDesktop";
import ProfileAddressMobile from "./ProfileAddressMobile";

const ProfileAddressScreen = ({ initialAddress }: { initialAddress: InitialAddress }) => {
  const isDesktop = useIsDesktop();
  const state = useProfileAddressPage(initialAddress);

  return isDesktop ? <ProfileAddressDesktop state={state} /> : <ProfileAddressMobile state={state} />;
};

const ProfileAddress = () => {
  useHead("Alterar endereço", "Atualize seu endereço na SICH");
  const { data } = useContext(userContext);

  if (!data) return null;

  return <ProfileAddressScreen initialAddress={data} />;
};

export default ProfileAddress;
