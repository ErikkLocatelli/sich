import { useNavigate } from "react-router-dom";

import type { AnyUserData } from "../../models/userData";
import { useProfileDataForm } from "./useProfileDataForm";
import { useUpdateProfile } from "./useProfileMutations";
import { useValidatedSubmit } from "./useValidatedSubmit";

export const useProfileDataPage = (initial: AnyUserData) => {
  const navigate = useNavigate();
  const { fields, documentRequired, validateForm, toBody } = useProfileDataForm(initial);
  const { mutate, isPending } = useUpdateProfile();
  const { validating, handleSubmit } = useValidatedSubmit(validateForm, () =>
    mutate(toBody(), { onSuccess: () => navigate("/profile") }),
  );

  return {
    email: initial.email,
    fields,
    documentRequired,
    isPending,
    submitDisabled: validating || isPending || fields.cnpjCpf.isValidating,
    handleSubmit,
  };
};

export type ProfileDataPageState = ReturnType<typeof useProfileDataPage>;
