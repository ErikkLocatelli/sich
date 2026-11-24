import type { ProfilePasswordPageState } from "../../../hooks/profile/useProfilePasswordPage";
import InputPassword from "../../form/InputPassword";

const ProfilePasswordFields = ({ fields }: { fields: ProfilePasswordPageState["fields"] }) => (
  <div className="flex flex-col gap-2.5">
    <InputPassword field={fields.currentPassword} label="Senha atual" placeholder="Senha atual" />
    <InputPassword field={fields.newPassword} label="Nova senha" placeholder="Nova senha" />
    <InputPassword field={fields.confirmation} label="Confirmar nova senha" placeholder="Confirmar nova senha" />
  </div>
);

export default ProfilePasswordFields;
