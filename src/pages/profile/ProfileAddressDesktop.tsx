import type { ProfileAddressPageState } from "../../hooks/profile/useProfileAddressPage";
import ProfileAddressFields from "../../components/pages/profile/ProfileAddressFields";
import ProfileFormActions from "../../components/pages/profile/ProfileFormActions";
import ProfileFormCard from "../../components/pages/profile/ProfileFormCard";
import ProfilePageLayout from "../../components/pages/profile/ProfilePageLayout";
import { PROFILE_FORM_COPY } from "../../components/pages/profile/profileForm";

const copy = PROFILE_FORM_COPY.address;

const ProfileAddressDesktop = ({ state }: { state: ProfileAddressPageState }) => (
  <ProfilePageLayout title={copy.title} variant="desktop">
    <ProfileFormCard title={copy.card} onSubmit={state.handleSubmit}>
      <ProfileAddressFields fields={state.fields} variant="desktop" />
      <ProfileFormActions submitLabel={copy.submit} disabled={state.submitDisabled} pending={state.isPending} variant="desktop" />
    </ProfileFormCard>
  </ProfilePageLayout>
);

export default ProfileAddressDesktop;
