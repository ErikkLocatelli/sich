import { useRef, useState } from "react";
import useForm from "../useForm";
import { validateFields } from "../../services/validators/validateFields";
import { createCepValidator } from "../../services/validators/validatorCep";

type InitialAddress = { city?: string | null; street?: string | null; state?: string | null };

export const useProfileAddressForm = (initialAddress: InitialAddress) => {
  const lookupId = useRef(0);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lookingUpCep, setLookingUpCep] = useState(false);
  const city = useForm({ initialValue: initialAddress.city ?? "" });
  const street = useForm({ initialValue: initialAddress.street ?? "" });
  const number = useForm({
    validator: (value) => /^(?:\d+[a-z]?|s\/n)$/i.test(value.trim()) || "Informe o número da residência ou s/n",
  });
  const state = useForm({
    initialValue: initialAddress.state ?? "",
    validator: (value) => /^[\p{L}\s]{2,}$/u.test(value.trim()) || "Informe o estado",
  });
  const cep = useForm({
    validator: (value) => /^\d{5}-?\d{3}$/.test(value.trim()) || "Informe um CEP com 8 dígitos",
  });

  const validateCep = async () => {
    const currentLookup = ++lookupId.current;
    setLookupError(null);
    setLookingUpCep(false);
    if (!await cep.validate() || currentLookup !== lookupId.current) return false;

    setLookingUpCep(true);
    try {
      const result = await createCepValidator((address) => {
        if (lookupId.current !== currentLookup) return;
        if (typeof address.street !== "string" || typeof address.city !== "string" || typeof address.state !== "string") {
          throw new Error("Resposta de CEP inválida");
        }
        city.setValue(address.city);
        street.setValue(address.street);
        state.setValue(address.state);
      })(cep.value);

      if (lookupId.current !== currentLookup) return false;
      setLookupError(result === true ? null : typeof result === "string" ? result : "CEP inválido");
      return result === true;
    } finally {
      if (lookupId.current === currentLookup) setLookingUpCep(false);
    }
  };

  const fields = {
    cep: {
      ...cep,
      error: cep.error ?? lookupError,
      isValidating: cep.isValidating || lookingUpCep,
      validate: validateCep,
      onBlur: validateCep,
      onChange: (event: Parameters<typeof cep.onChange>[0]) => {
        // Ignora respostas antigas caso o CEP seja alterado durante a consulta.
        lookupId.current++;
        setLookupError(null);
        setLookingUpCep(false);
        cep.onChange(event);
      },
    },
    city,
    street,
    number,
    state,
  };

  return { fields, validateForm: () => validateFields(fields) };
};
