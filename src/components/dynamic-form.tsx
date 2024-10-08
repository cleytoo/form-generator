import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createDynamicSchema, FormConfigType } from '../utils'
import { DynamicFormError } from './dynamic-form-error'
import { EmptyForm } from './empty-form'

interface DynamicFormGeneratorProps {
  data: FormConfigType[]
  resetForm: () => void
  removeField: (id: number) => void
}

export function DynamicFormGenerator(props: DynamicFormGeneratorProps) {
  const { data, resetForm, removeField } = props
  const hasEmptyFields = !data.length

  const validateSchema = createDynamicSchema(data)
  type SchemaType = z.infer<typeof validateSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SchemaType>({
    resolver: zodResolver(validateSchema),
  })

  const handleValidation = async (data: SchemaType) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    resetForm()
    reset()
    alert(`validado com sucesso! ${JSON.stringify(data)}`)
  }

  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className='className="space-y-6 w-[400px]"'>
          <h1 className="text-2xl">Validando...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(handleValidation)}
        className="space-y-6 w-[400px]"
      >
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-gray-800 text-slate-100 h-9 px-4 py-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={hasEmptyFields}
          >
            Validar
          </button>
          <button
            type="button"
            onClick={() => {
              resetForm()
              reset()
            }}
            className="w-[200px] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-rose-700 text-slate-100 h-9 px-4 py-2 "
          >
            Reiniciar 🔖
          </button>
        </div>

        {hasEmptyFields && <EmptyForm />}
        {data?.map((field) => (
          <div key={field.id} className="space-y-1">
            <label
              htmlFor={field.id.toString()}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
            >
              {field.label}
            </label>
            <div className="flex items-center gap-2">
              {field.type === 'textarea' ? (
                <textarea
                  className="flex w-full resize-none rounded-md border border-slate-600 bg-transparent p-3"
                  placeholder="Escreva algo..."
                  {...register(field.name)}
                />
              ) : (
                <input
                  id={field.id.toString()}
                  type={field.type}
                  placeholder={`${field.label}...`}
                  className="flex text-sm h-9 w-full rounded-md border border-slate-600 bg-transparent px-3 py-1 placeholder:text-xs placeholder:italic"
                  {...register(field.name)}
                />
              )}

              <button
                type="button"
                tabIndex={-1}
                onClick={() => removeField(field.id)}
                className="h-9 w-9 inline-flex items-center justify-center whitespace-nowrap transition-colors rounded-md text-sm font-medium border border-rose-600 bg-transparent shadow-sm hover:bg-rose-200"
              >
                <Trash2 className="w-4 h-4 text-rose-700" />
              </button>
            </div>

            <DynamicFormError
              errorMessage={errors[field.name]?.message?.toString()}
            />
          </div>
        ))}
      </form>
    </div>
  )
}
