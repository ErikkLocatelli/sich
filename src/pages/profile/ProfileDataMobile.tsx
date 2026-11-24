import type { ProfileDataPageState } from "../../hooks/profile/useProfileDataPage";
import ProfileDataFields from "../../components/pages/profile/ProfileDataFields";
import ProfileFormActions from "../../components/pages/profile/ProfileFormActions";
import ProfilePageLayout from "../../components/pages/profile/ProfilePageLayout";
import { PROFILE_FORM_COPY } from "../../components/pages/profile/profileForm";

const copy = PROFILE_FORM_COPY.data;

const ProfileDataMobile = ({ state }: { state: ProfileDataPageState }) => (
  <ProfilePageLayout title={copy.title}>
    <form noValidate onSubmit={state.handleSubmit} className="mx-auto max-w-lg px-8.5 pt-11 pb-8">
      <ProfileDataFields {...state} />
      <ProfileFormActions submitLabel={copy.submit} disabled={state.submitDisabled} pending={state.isPending} />
    </form>
  </ProfilePageLayout>
);

export default ProfileDataMobile;
