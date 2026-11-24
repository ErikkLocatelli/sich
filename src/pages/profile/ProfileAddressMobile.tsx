import type { ProfileAddressPageState } from "../../hooks/profile/useProfileAddressPage";
import ProfileAddressFields from "../../components/pages/profile/ProfileAddressFields";
import ProfileFormActions from "../../components/pages/profile/ProfileFormActions";
import ProfilePageLayout from "../../components/pages/profile/ProfilePageLayout";
import { PROFILE_FORM_COPY } from "../../components/pages/profile/profileForm";

const copy = PROFILE_FORM_COPY.address;

const ProfileAddressMobile = ({ state }: { state: ProfileAddressPageState }) => (
  <ProfilePageLayout title={copy.title}>
    <form noValidate onSubmit={state.handleSubmit} className="mx-auto max-w-lg px-8.5 pt-11 pb-8">
      <ProfileAddressFields fields={state.fields} />
      <ProfileFormActions submitLabel={copy.submit} disabled={state.submitDisabled} pending={state.isPending} />
    </form>
  </ProfilePageLayout>
);

export default ProfileAddressMobile;
