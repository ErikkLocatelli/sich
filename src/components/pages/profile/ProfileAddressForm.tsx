import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building, Building2, House, Map, MapPinHouse, Road, Signpost } from "lucide-react";
import { useProfileAddressForm, type InitialAddress } from "../../../hooks/profile/useProfileAddressForm";
import { useUpdateAddress } from "../../../hooks/profile/useProfileMutations";
import Input from "../../form/Input";
import { Button } from "../../ui/button";
import { Spinner } from "../../ui/spinner";

const addressFields = [
  { name: "cep", label: "CEP", placeholder: "00000-000", type: "tel", icon: MapPinHouse },
  { name: "city", label: "Cidade", placeholder: "Nome da cidade", icon: Building2 },
  { name: "street", label: "Rua", placeholder: "Nome da rua", icon: Road },
  { name: "number", label: "Número", placeholder: "Número da residência ou edifício", icon: House },
  { name: "complement", label: "Complemento (opcional)", placeholder: "Ex.: Apto 12", icon: Building },
  { name: "neighborhood", label: "Bairro (opcional)", placeholder: "Nome do bairro", icon: Signpost },
  { name: "state", label: "Estado", placeholder: "Ex.: São Paulo", icon: Map },
] as const;

const ProfileAddressForm = ({ initialAddress }: { initialAddress: InitialAddress }) => {
  const navigate = useNavigate();
  const { fields, validateForm, toBody } = useProfileAddressForm(initialAddress);
  const { mutate, isPending } = useUpdateAddress();
  const [validating, setValidating] = useState(false);

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
        {addressFields.map(({ name, ...props }) => (
          <div key={name}>
            <Input
              {...props}
              value={fields[name].value}
              onChange={fields[name].onChange}
              onBlur={fields[name].onBlur}
              error={fields[name].error}
            />
            {name === "cep" && fields.cep.isValidating && <p role="status" className="mt-1 text-[11px] text-sich-label">Consultando CEP...</p>}
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <Button render={<Link to="/profile" />} nativeButton={false} variant="outline" className="h-11.5 min-w-0 flex-1 rounded-[16px] border-sich-border bg-white text-[12px] font-semibold text-sich-magenta">
          Cancelar
        </Button>
        <Button type="submit" disabled={validating || isPending || fields.cep.isValidating} className="h-11.5 min-w-0 flex-1 gap-1.5 rounded-[16px] bg-sich-gradient text-[12px] font-semibold text-white shadow-sich-button">
          {isPending && <Spinner className="size-3.5" />}
          Salvar endereço
        </Button>
      </div>
    </form>
  );
};

export default ProfileAddressForm;
