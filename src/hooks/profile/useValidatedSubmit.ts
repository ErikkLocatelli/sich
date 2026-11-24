import { useState, type FormEvent } from "react";

/** Prevents the native submit, runs `validate` and calls `submit` only when it passes. */
export const useValidatedSubmit = (validate: () => Promise<boolean>, submit: () => void) => {
  const [validating, setValidating] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidating(true);
    try {
      if (!(await validate())) return;
      submit();
    } finally {
      setValidating(false);
    }
  };

  return { validating, handleSubmit };
};
