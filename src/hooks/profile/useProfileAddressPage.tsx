import { useNavigate } from "react-router-dom";

import { useProfileAddressForm, type InitialAddress } from "./useProfileAddressForm";
import { useUpdateAddress } from "./useProfileMutations";
import { useValidatedSubmit } from "./useValidatedSubmit";

export const useProfileAddressPage = (initialAddress: InitialAddress) => {
  const navigate = useNavigate();
  const { fields, validateForm, toBody } = useProfileAddressForm(initialAddress);
  const { mutate, isPending } = useUpdateAddress();
  const { validating, handleSubmit } = useValidatedSubmit(validateForm, () =>
    mutate(toBody(), { onSuccess: () => navigate("/profile") }),
  );

  return {
    fields,
    isPending,
    submitDisabled: validating || isPending || fields.cep.isValidating,
    handleSubmit,
  };
};

export type ProfileAddressPageState = ReturnType<typeof useProfileAddressPage>;
