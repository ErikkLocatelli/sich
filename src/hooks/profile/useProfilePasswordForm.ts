import useForm from "../useForm";
import { validateFields } from "../../services/validators/validateFields";

export const useProfilePasswordForm = () => {
  const currentPassword = useForm();
  const newPassword = useForm({
    type: "password",
    validator: (value) => value !== currentPassword.value || "A nova senha deve ser diferente da atual",
  });
  const confirmation = useForm({
    validator: (value) => value === newPassword.value || "As senhas não coincidem",
  });

  const fields = { currentPassword, newPassword, confirmation };

  return { fields, validateForm: () => validateFields(fields) };
};
