import type { ProfilePasswordPageState } from "../../hooks/profile/useProfilePasswordPage";
import ProfilePageLayout from "../../components/pages/profile/ProfilePageLayout";
import ProfilePasswordFields from "../../components/pages/profile/ProfilePasswordFields";
import { PROFILE_FORM_COPY } from "../../components/pages/profile/profileForm";
import { Button } from "../../components/ui/button";
import { Spinner } from "../../components/ui/spinner";
import securityIllustration from "../../assets/svgs/ProfileSecurity.svg";

const copy = PROFILE_FORM_COPY.password;

const ProfilePasswordMobile = ({ state }: { state: ProfilePasswordPageState }) => (
  <ProfilePageLayout title={copy.title}>
    <div className="mx-auto max-w-lg px-6 pt-9 pb-8">
      <div className="flex justify-center">
        <img src={securityIllustration} alt="" aria-hidden="true" />
      </div>
      <p className="mx-auto mt-8 max-w-72 text-center text-[13px] leading-5.25 text-sich-label">{copy.hint}</p>

      <form noValidate onSubmit={state.handleSubmit} className="mt-9">
        <ProfilePasswordFields fields={state.fields} />
        <Button
          type="submit"
          disabled={state.submitDisabled}
          className="mt-6 h-12 w-full gap-1.5 rounded-[16px] bg-sich-gradient text-[13px] font-semibold text-white shadow-sich-button"
        >
          {state.isPending && <Spinner className="size-3.5" />}
          {copy.submit}
        </Button>
      </form>
    </div>
  </ProfilePageLayout>
);

export default ProfilePasswordMobile;
