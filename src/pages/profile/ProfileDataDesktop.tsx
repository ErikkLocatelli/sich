import type { ProfileDataPageState } from "../../hooks/profile/useProfileDataPage";
import ProfileDataFields from "../../components/pages/profile/ProfileDataFields";
import ProfileFormActions from "../../components/pages/profile/ProfileFormActions";
import ProfileFormCard from "../../components/pages/profile/ProfileFormCard";
import ProfilePageLayout from "../../components/pages/profile/ProfilePageLayout";
import { PROFILE_FORM_COPY } from "../../components/pages/profile/profileForm";

const copy = PROFILE_FORM_COPY.data;

const ProfileDataDesktop = ({ state }: { state: ProfileDataPageState }) => (
  <ProfilePageLayout title={copy.title} variant="desktop">
    <ProfileFormCard title={copy.card} onSubmit={state.handleSubmit}>
      <ProfileDataFields {...state} variant="desktop" />
      <ProfileFormActions submitLabel={copy.submit} disabled={state.submitDisabled} pending={state.isPending} variant="desktop" />
    </ProfileFormCard>
  </ProfilePageLayout>
);

export default ProfileDataDesktop;
