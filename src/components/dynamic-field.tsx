import { useForm } from 'react-hook-form'

import { type CreatedFormItemType } from '../utils'
import { DynamicFormError } from './dynamic-form-error'

interface DynamicFieldProps {
  action: (field: CreatedFormItemType) => void
}

export function DynamicField({ action }: DynamicFieldProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatedFormItemType>()

  const handleAddField = (data: CreatedFormItemType) => {
    action(data)
    reset()
  }

  return (
    <div className="flex flex-col justify-center items-center border-r border-slate-500 p-10 ">
      <h1 className="text-2xl">Adicionar novo campo!</h1>
      <form
        onSubmit={handleSubmit(handleAddField)}
        className="space-y-4 w-[440px] p-2"
      >
        <div className="space-y-1">
          <label
            htmlFor="name"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Nome
          </label>
          <div className="flex gap-1">
            <div className="w-full">
              <input
                id="name"
                placeholder="logradouro..."
                className="flex text-sm h-9 w-full rounded-md border border-slate-600 bg-transparent px-3 py-1"
                {...register('name', {
                  required: 'Campo obrigatório',
                  minLength: {
                    value: 5,
                    message: 'Mínimo de 5 caracteres',
                  },
                })}
              />
              <DynamicFormError errorMessage={errors.name?.message} />
            </div>
            <select
              className="flex h-9 text-sm rounded-md border border-slate-600 bg-transparent px-3 py-1"
              {...register('type')}
            >
              <option value="text">Texto</option>
              <option value="email">Email</option>
              <option value="number">Número</option>
              <option value="textarea">Textarea</option>
            </select>
          </div>
        </div>

        <div className="flex w-full gap-2 justify-between">
          <div className="space-y-2 w-full">
            <label htmlFor="min">MIN</label>
            <input
              id="min"
              type="number"
              placeholder="min"
              className="flex h-9 w-full rounded-md border border-slate-600 bg-transparent px-3 py-1"
              defaultValue={0}
              {...register('min')}
            />
          </div>
          <div className="space-y-2 w-full">
            <label htmlFor="max">MAX</label>
            <input
              id="max"
              type="number"
              placeholder="max"
              className="flex h-9 w-full rounded-md border border-slate-600 bg-transparent px-3 py-1"
              defaultValue={100}
              {...register('max')}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="required" {...register('required')} />
          <label
            htmlFor="required"
            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Campo obrigatório
          </label>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-gray-800 text-slate-100 h-9 px-4 py-2"
        >
          Adicionar
        </button>
      </form>
    </div>
  )
}
