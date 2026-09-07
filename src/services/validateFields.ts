import type { UseFormReturn } from "../hooks/useForm"

type FieldsMap = Record<string, UseFormReturn>

export const validateFields = async (fields: FieldsMap): Promise<boolean> => {
    const results = await Promise.all(Object.values(fields).map(field => field.validate()))

    return results.every(result => result)
}