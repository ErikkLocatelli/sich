import { IdCard, Mail, UserRound } from "lucide-react";

import type { ProfileDataPageState } from "../../../hooks/profile/useProfileDataPage";
import Input from "../../form/Input";
import PhoneInput from "../../form/PhoneInputs";
import IdentityInput from "../../form/IdentityInput";
import type { ProfileVariant } from "./profileMenu";
import { fieldsLayoutClass } from "./profileForm";

type ProfileDataFieldsProps = Pick<ProfileDataPageState, "email" | "fields" | "documentRequired"> & {
  variant?: ProfileVariant;
};

const ProfileDataFields = ({ email, fields, documentRequired, variant = "mobile" }: ProfileDataFieldsProps) => (
  <div className={fieldsLayoutClass[variant]}>
    <Input label="Email" value={email} icon={Mail} disabled tip="O email é usado para entrar e não pode ser alterado" />
    <Input
      label="Nome"
      placeholder="Seu nome"
      icon={UserRound}
      value={fields.name.value}
      onChange={fields.name.onChange}
      onBlur={fields.name.onBlur}
      error={fields.name.error}
    />
    <PhoneInput
      label="Telefone"
      placeholder="(00) 00000-0000"
      type="tel"
      value={fields.phone.value}
      onChange={fields.phone.setValue}
      onBlur={fields.phone.onBlur}
      error={fields.phone.error}
    />
    <IdentityInput
      label={documentRequired ? "CPF/CNPJ" : "CPF/CNPJ (opcional)"}
      placeholder="000.000.000-00"
      icon={IdCard}
      value={fields.cnpjCpf.value}
      onChange={fields.cnpjCpf.setValue}
      onBlur={fields.cnpjCpf.onBlur}
      error={fields.cnpjCpf.error}
    />
  </div>
);

export default ProfileDataFields;
