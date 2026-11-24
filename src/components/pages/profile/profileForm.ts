import type { ProfileVariant } from "./profileMenu";

export const fieldsLayoutClass: Record<ProfileVariant, string> = {
  mobile: "flex flex-col gap-2.5",
  desktop: "grid grid-cols-2 gap-x-5 gap-y-3",
};

/** Shared copy of the form pages, so mobile and desktop never drift apart. */
export const PROFILE_FORM_COPY = {
  data: { title: "Meus dados", card: "Dados pessoais", submit: "Salvar dados" },
  address: { title: "Alterar endereço", card: "Endereço", submit: "Salvar endereço" },
  password: {
    title: "Redefinir senha",
    card: "Nova senha",
    submit: "Confirmar",
    hint: "Informe sua senha atual e crie uma nova senha para sua conta.",
  },
};
