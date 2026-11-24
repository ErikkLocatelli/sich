import { Building, Building2, House, Map, MapPinHouse, Road, Signpost } from "lucide-react";

import type { ProfileAddressPageState } from "../../../hooks/profile/useProfileAddressPage";
import Input from "../../form/Input";
import type { ProfileVariant } from "./profileMenu";
import { fieldsLayoutClass } from "./profileForm";

const addressFields = [
  { name: "cep", label: "CEP", placeholder: "00000-000", type: "tel", icon: MapPinHouse },
  { name: "city", label: "Cidade", placeholder: "Nome da cidade", icon: Building2 },
  { name: "street", label: "Rua", placeholder: "Nome da rua", icon: Road },
  { name: "number", label: "Número", placeholder: "Número da residência ou edifício", icon: House },
  { name: "complement", label: "Complemento (opcional)", placeholder: "Ex.: Apto 12", icon: Building },
  { name: "neighborhood", label: "Bairro (opcional)", placeholder: "Nome do bairro", icon: Signpost },
  { name: "state", label: "Estado", placeholder: "Ex.: São Paulo", icon: Map },
] as const;

type ProfileAddressFieldsProps = {
  fields: ProfileAddressPageState["fields"];
  variant?: ProfileVariant;
};

const ProfileAddressFields = ({ fields, variant = "mobile" }: ProfileAddressFieldsProps) => (
  <div className={fieldsLayoutClass[variant]}>
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
);

export default ProfileAddressFields;
