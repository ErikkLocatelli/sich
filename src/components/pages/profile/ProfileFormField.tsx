import { useState, type ComponentProps } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import type { UseFormReturn } from "../../../hooks/useForm";
import { Field, FieldLabel } from "../../ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../../ui/input-group";
import Error from "../../commons/Error";

type ProfileFormFieldProps = {
  id: string;
  label: string;
  field: UseFormReturn;
  placeholder?: string;
  type?: "text" | "tel" | "password";
  autoComplete?: ComponentProps<"input">["autoComplete"];
  hideLabel?: boolean;
  loadingMessage?: string;
};

const ProfileFormField = ({ id, label, field, placeholder, type = "text", autoComplete, hideLabel = false, loadingMessage }: ProfileFormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const errorId = `${id}-error`;

  return (
    <Field className={hideLabel ? "gap-0" : "gap-3"}>
      <FieldLabel htmlFor={id} className={hideLabel ? "sr-only" : "text-[12px] font-semibold text-sich-heading"}>
        {label}
      </FieldLabel>
      <InputGroup className={`${isPassword ? "h-12.75" : "h-12.25"} rounded-[16px] border-sich-border bg-white px-2`} data-invalid={!!field.error}>
        {isPassword && <InputGroupAddon><Lock aria-hidden="true" className="size-4" /></InputGroupAddon>}
        <InputGroupInput
          id={id}
          name={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          aria-invalid={!!field.error}
          aria-busy={field.isValidating}
          aria-describedby={field.error ? errorId : undefined}
          className="h-full rounded-none border-0 bg-transparent px-2 py-0 text-[13px] placeholder:text-[13px] autofill-fix"
        />
        {isPassword && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton type="button" variant="ghost" aria-label={`${showPassword ? "Ocultar" : "Mostrar"} ${label.toLowerCase()}`} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff aria-hidden="true" className="size-4" /> : <Eye aria-hidden="true" className="size-4" />}
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
      {field.isValidating && loadingMessage && <p role="status" className="text-[11px] text-sich-label">{loadingMessage}</p>}
      {field.error && <div id={errorId} role="alert" className="mt-1"><Error message={field.error} className="block animateDown" /></div>}
    </Field>
  );
};

export default ProfileFormField;
