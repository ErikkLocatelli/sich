import { useContext, useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../services/userContext";
import useHead from "../../hooks/useHead";
import { useProfilePasswordForm } from "../../hooks/profile/useProfilePasswordForm";
import ProfilePageLayout from "../../components/pages/profile/ProfilePageLayout";
import InputPassword from "../../components/form/InputPassword";
import { Button } from "../../components/ui/button";
import securityIllustration from "../../assets/svgs/ProfileSecurity.svg";

const ProfilePassword = () => {
  useHead("Redefinir senha", "Altere a senha da sua conta SICH");
  const { data } = useContext(userContext);
  const { fields, validateForm } = useProfilePasswordForm();
  const [message, setMessage] = useState("");
  const [validating, setValidating] = useState(false);

  if (data?.userType !== "CUSTOMER") return <Navigate to="/profile" replace />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setValidating(true);
    try {
      if (await validateForm()) {
        // Não enviar nem persistir senhas até existir o endpoint de alteração.
        setMessage("A alteração de senha ainda não está disponível.");
      }
    } finally {
      setValidating(false);
    }
  };

  return (
    <ProfilePageLayout title="Redefinir senha">
      <div className="mx-auto max-w-lg px-6 pt-9 pb-8">
        <div className="flex justify-center">
          <img src={securityIllustration} alt="" aria-hidden="true" />
        </div>
        <p className="mx-auto mt-8 max-w-72 text-center text-[13px] leading-5.25 text-sich-label">
          Informe sua senha atual e crie uma nova senha para sua conta.
        </p>

        <form noValidate onSubmit={handleSubmit} onChange={() => setMessage("")} className="mt-9">
          <InputPassword field={fields.currentPassword} label="Senha atual" placeholder="Senha atual" />
          <div className="mt-15 flex flex-col gap-3.5">
            <InputPassword field={fields.newPassword} label="Nova senha" placeholder="Nova senha" />
            <InputPassword field={fields.confirmation} label="Confirmar nova senha" placeholder="Confirmar nova senha" />
          </div>
          <Button type="submit" disabled={validating} className="mt-11 h-12 w-full rounded-[16px] bg-sich-gradient text-[13px] font-semibold text-white shadow-sich-button">
            Confirmar
          </Button>
          <p role="status" aria-live="polite" className="mt-4 text-[12px] text-sich-label">{message}</p>
        </form>
      </div>
    </ProfilePageLayout>
  );
};

export default ProfilePassword;
