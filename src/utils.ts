import { z, ZodObject } from 'zod'

export type FormConfigType = {
  id: number
  name: string
  label: string
  type: string
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

export type CreatedFormItemType = {
  name: string
  type: string
  min: number
  max: number
  required: boolean
}

export const formConfig = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    required: true,
    minLength: 3,
  },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'age', label: 'Age', type: 'number', min: 18, max: 100 },
  { name: 'bio', label: 'Bio', type: 'textarea', maxLength: 200 },
]

export function generateField(data: CreatedFormItemType): FormConfigType {
  return {
    id: Math.random(),
    label: data.name,
    name: data.name,
    type: data.type,
    required: data.required ?? false,
    minLength: ['text', 'textarea'].includes(data.type) ? data.min : undefined,
    maxLength: ['text', 'textarea'].includes(data.type) ? data.max : undefined,
    min: data.type === 'number' ? data.min : undefined,
    max: data.type === 'number' ? data.max : undefined,
  }
}

export const createDynamicSchema = (
  config: FormConfigType[],
): ZodObject<any> => {
  const shape: Record<string, any> = {}

  config.forEach((field) => {
    let fieldSchema: any

    if (field.type === 'email') {
      fieldSchema = z.string().email({
        message: `Deve ser um email válido`,
      })
    }

    if (field.type === 'number') {
      fieldSchema = z.coerce.number()

      if (field.min) {
        fieldSchema = fieldSchema.min(field.min, {
          message: `O valor mínimo é ${field.min}`,
        })
      }

      if (field.max) {
        fieldSchema = fieldSchema.max(field.max, {
          message: `O valor máximo é ${field.max}`,
        })
      }
    }

    if (['text', 'textarea'].includes(field.type)) {
      fieldSchema = z.string()

      if (field.minLength) {
        fieldSchema = fieldSchema.min(field.minLength, {
          message: `O mínimo de caracteres é ${field.minLength}`,
        })
      }

      if (field.maxLength) {
        fieldSchema = fieldSchema.max(field.maxLength, {
          message: `O máximo de caracteres é ${field.maxLength}`,
        })
      }
    }

    if (field.required) {
      fieldSchema = fieldSchema.nonempty({
        message: `Campo obrigatório`,
      })
    }

    shape[field.name] = fieldSchema
  })

  return z.object(shape)
}
