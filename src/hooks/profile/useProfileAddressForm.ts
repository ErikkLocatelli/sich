import { useRef, useState } from "react";
import type { AddressBody } from "../../api/user/profile";
import useForm from "../useForm";
import { formatCep } from "../../services/profile/profileFormat";
import { validateFields } from "../../services/validators/validateFields";
import { createCepValidator } from "../../services/validators/validatorCep";

export type InitialAddress = {
  cep?: string | null;
  city?: string | null;
  street?: string | null;
  state?: string | null;
  numberAdress?: string | null;
  complementAdress?: string | null;
  neighborhood?: string | null;
};

const cepDigits = (value: string) => value.replace(/\D/g, "");

export const useProfileAddressForm = (initialAddress: InitialAddress) => {
  const lookupId = useRef(0);
  // CEP whose address is already in the form: validating it again must not overwrite manual edits
  const resolvedCep = useRef(cepDigits(initialAddress.cep ?? ""));
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lookingUpCep, setLookingUpCep] = useState(false);
  const city = useForm({ initialValue: initialAddress.city ?? "" });
  const street = useForm({ initialValue: initialAddress.street ?? "" });
  const neighborhood = useForm({ initialValue: initialAddress.neighborhood ?? "", required: false });
  const complement = useForm({ initialValue: initialAddress.complementAdress ?? "", required: false });
  const number = useForm({
    initialValue: initialAddress.numberAdress ?? "",
    validator: (value) => /^(?:\d+[a-z]?|s\/n)$/i.test(value.trim()) || "Informe o número da residência ou s/n",
  });
  const state = useForm({
    initialValue: initialAddress.state ?? "",
    validator: (value) => /^[\p{L}\s]{2,}$/u.test(value.trim()) || "Informe o estado",
  });
  const cep = useForm({
    initialValue: initialAddress.cep ? formatCep(initialAddress.cep) : "",
    validator: (value) => /^\d{5}-?\d{3}$/.test(value.trim()) || "Informe um CEP com 8 dígitos",
  });

  const validateCep = async () => {
    const currentLookup = ++lookupId.current;
    setLookupError(null);
    setLookingUpCep(false);
    if (!await cep.validate() || currentLookup !== lookupId.current) return false;
    if (cepDigits(cep.value) === resolvedCep.current) return true;

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
        if (typeof address.neighborhood === "string") neighborhood.setValue(address.neighborhood);
      })(cep.value);

      if (lookupId.current !== currentLookup) return false;
      if (result === true) resolvedCep.current = cepDigits(cep.value);
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
    neighborhood,
    complement,
    state,
  };

  /** Every field shown on the screen; empty optional fields clear the stored value. */
  const toBody = (): AddressBody => ({
    cep: cepDigits(cep.value),
    city: city.value.trim(),
    state: state.value.trim(),
    street: street.value.trim(),
    numberAdress: number.value.trim(),
    neighborhood: neighborhood.value.trim(),
    complementAdress: complement.value.trim(),
  });

  return { fields, validateForm: () => validateFields(fields), toBody };
};
