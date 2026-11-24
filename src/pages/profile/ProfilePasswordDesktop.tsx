import type { ProfilePasswordPageState } from "../../hooks/profile/useProfilePasswordPage";
import Card from "../../components/commons/Card";
import SubTitle from "../../components/commons/SubTitle";
import ProfileFormActions from "../../components/pages/profile/ProfileFormActions";
import ProfilePageLayout from "../../components/pages/profile/ProfilePageLayout";
import ProfilePasswordFields from "../../components/pages/profile/ProfilePasswordFields";
import { PROFILE_FORM_COPY } from "../../components/pages/profile/profileForm";
import securityIllustration from "../../assets/svgs/ProfileSecurity.svg";

const copy = PROFILE_FORM_COPY.password;

const ProfilePasswordDesktop = ({ state }: { state: ProfilePasswordPageState }) => (
  <ProfilePageLayout title={copy.title} variant="desktop">
    <form noValidate onSubmit={state.handleSubmit} className="px-10">
      <Card className="grid max-w-3xl grid-cols-2 items-center gap-8 border border-sich-border p-5.5">
        <div className="flex flex-col items-center gap-6 rounded-[16px] bg-sich-surface px-6 py-8 text-center">
          <img src={securityIllustration} alt="" aria-hidden="true" />
          <p className="max-w-72 text-[13px] leading-5.25 text-sich-label">{copy.hint}</p>
        </div>

        <div className="flex flex-col gap-6">
          <SubTitle text={copy.card} className="text-sich-heading" />
          <ProfilePasswordFields fields={state.fields} />
          <ProfileFormActions submitLabel={copy.submit} disabled={state.submitDisabled} pending={state.isPending} variant="desktop" />
        </div>
      </Card>
    </form>
  </ProfilePageLayout>
);

export default ProfilePasswordDesktop;
