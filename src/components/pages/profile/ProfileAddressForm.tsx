import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useProfileAddressForm } from "../../../hooks/profile/useProfileAddressForm";
import ProfileFormField from "./ProfileFormField";
import { Button } from "../../ui/button";

const ProfileAddressForm = ({ initialAddress }: { initialAddress: { city?: string | null; street?: string | null; state?: string | null } }) => {
  const { fields, validateForm } = useProfileAddressForm(initialAddress);
  const [message, setMessage] = useState("");
  const [validating, setValidating] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setValidating(true);
    try {
      if (await validateForm()) {
        // Conectar ao endpoint de edição quando ele estiver disponível.
        setMessage("A alteração de endereço ainda não está disponível.");
      }
    } finally {
      setValidating(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} onChange={() => setMessage("")} className="mx-auto max-w-lg px-8.5 pt-11 pb-8">
      <div className="flex flex-col gap-6">
        <ProfileFormField id="profile-address-cep" label="CEP" placeholder="00000-000" type="tel" field={fields.cep} autoComplete="postal-code" loadingMessage="Consultando CEP..." />
        <ProfileFormField id="profile-address-city" label="Cidade" placeholder="Nome da cidade" field={fields.city} autoComplete="address-level2" />
        <ProfileFormField id="profile-address-street" label="Rua" placeholder="Nome da rua" field={fields.street} autoComplete="address-line1" />
        <ProfileFormField id="profile-address-number" label="Número" placeholder="Número da residência ou edifício" field={fields.number} />
        <ProfileFormField id="profile-address-state" label="Estado" placeholder="Ex.: São Paulo" field={fields.state} autoComplete="address-level1" />
      </div>

      <div className="mt-12 flex gap-2">
        <Button render={<Link to="/profile" />} nativeButton={false} variant="outline" className="h-11.5 min-w-0 flex-1 rounded-[16px] border-sich-border bg-white text-[12px] font-semibold text-sich-magenta">
          Cancelar
        </Button>
        <Button type="submit" disabled={validating || fields.cep.isValidating} className="h-11.5 min-w-0 flex-1 rounded-[16px] bg-sich-gradient text-[12px] font-semibold text-white shadow-sich-button">
          Salvar endereço
        </Button>
      </div>
      <p role="status" aria-live="polite" className="mt-4 text-[12px] text-sich-label">{message}</p>
    </form>
  );
};

export default ProfileAddressForm;
