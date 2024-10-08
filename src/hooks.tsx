import { useState } from 'react'

import { CreatedFormItemType, FormConfigType, generateField } from './utils'

interface UseDynamicFormProps {
  initialData: Omit<FormConfigType, 'id'>[]
}

export const useDynamicForm = ({ initialData }: UseDynamicFormProps) => {
  const [fields, setFields] = useState<FormConfigType[]>(() =>
    initialData.map((field) => ({
      ...field,
      id: Math.random(),
      required: field.required ?? false,
    })),
  )

  const handleAddField = (field: CreatedFormItemType) => {
    const newField = generateField(field)
    setFields((prev) => [...prev, newField])
  }

  const handleRemoveField = (id: number) => {
    setFields((prev) => prev.filter((field) => field.id !== id))
  }

  const resetForm = () => {
    setFields(() =>
      initialData.map((field) => ({
        ...field,
        id: Math.random(),
        required: field.required ?? false,
      })),
    )
  }

  return {
    fields,
    handleAddField,
    handleRemoveField,
    resetForm,
  }
}
