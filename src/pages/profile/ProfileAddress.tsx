import { useContext } from "react";
import { userContext } from "../../services/userContext";
import useHead from "../../hooks/useHead";
import ProfilePageLayout from "../../components/pages/profile/ProfilePageLayout";
import ProfileAddressForm from "../../components/pages/profile/ProfileAddressForm";

const ProfileAddress = () => {
  useHead("Alterar endereço", "Atualize seu endereço na SICH");
  const { data } = useContext(userContext);

  if (!data) return null;

  return (
    <ProfilePageLayout title="Alterar endereço">
      <ProfileAddressForm initialAddress={data} />
    </ProfilePageLayout>
  );
};

export default ProfileAddress;
