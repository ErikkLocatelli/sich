import { useNavigate } from "react-router-dom";

import { useProfilePasswordForm } from "./useProfilePasswordForm";
import { useChangePassword } from "./useProfileMutations";
import { useValidatedSubmit } from "./useValidatedSubmit";

export const useProfilePasswordPage = () => {
  const navigate = useNavigate();
  const { fields, validateForm, toBody } = useProfilePasswordForm();
  const { mutate, isPending } = useChangePassword();
  const { validating, handleSubmit } = useValidatedSubmit(validateForm, () =>
    mutate(toBody(), { onSuccess: () => navigate("/profile") }),
  );

  return { fields, isPending, submitDisabled: validating || isPending, handleSubmit };
};

export type ProfilePasswordPageState = ReturnType<typeof useProfilePasswordPage>;
