import { useContext, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IdCard, Mail, UserRound } from "lucide-react";

import { userContext } from "../../services/userContext";
import type { AnyUserData } from "../../models/userData";
import useHead from "../../hooks/useHead";
import { useProfileDataForm } from "../../hooks/profile/useProfileDataForm";
import { useUpdateProfile } from "../../hooks/profile/useProfileMutations";
import ProfilePageLayout from "../../components/pages/profile/ProfilePageLayout";
import Input from "../../components/form/Input";
import PhoneInput from "../../components/form/PhoneInputs";
import IdentityInput from "../../components/form/IdentityInput";
import { Button } from "../../components/ui/button";
import { Spinner } from "../../components/ui/spinner";

const ProfileDataForm = ({ initial }: { initial: AnyUserData }) => {
  const navigate = useNavigate();
  const { fields, documentRequired, validateForm, toBody } = useProfileDataForm(initial);
  const { mutate, isPending } = useUpdateProfile();
  const [validating, setValidating] = useState(false);
  const busy = validating || isPending;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidating(true);
    try {
      if (!(await validateForm())) return;
      mutate(toBody(), { onSuccess: () => navigate("/profile") });
    } finally {
      setValidating(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="mx-auto max-w-lg px-8.5 pt-11 pb-8">
      <div className="flex flex-col gap-2.5">
        <Input label="Email" value={initial.email} icon={Mail} disabled tip="O email é usado para entrar e não pode ser alterado" />
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

      <div className="mt-6 flex gap-2">
        <Button render={<Link to="/profile" />} nativeButton={false} variant="outline" className="h-11.5 min-w-0 flex-1 rounded-[16px] border-sich-border bg-white text-[12px] font-semibold text-sich-magenta">
          Cancelar
        </Button>
        <Button type="submit" disabled={busy || fields.cnpjCpf.isValidating} className="h-11.5 min-w-0 flex-1 gap-1.5 rounded-[16px] bg-sich-gradient text-[12px] font-semibold text-white shadow-sich-button">
          {isPending && <Spinner className="size-3.5" />}
          Salvar dados
        </Button>
      </div>
    </form>
  );
};

const ProfileData = () => {
  useHead("Meus dados", "Atualize seus dados pessoais na SICH");
  const { data } = useContext(userContext);

  if (!data) return null;

  return (
    <ProfilePageLayout title="Meus dados">
      <ProfileDataForm initial={data} />
    </ProfilePageLayout>
  );
};

export default ProfileData;
