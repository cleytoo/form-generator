import { DynamicField } from './components/dynamic-field'
import { DynamicFormGenerator } from './components/dynamic-form'

import { useDynamicForm } from './hooks'
import { formConfig } from './utils'

export function App() {
  const { fields, handleAddField, resetForm, handleRemoveField } =
    useDynamicForm({
      initialData: formConfig,
    })

  return (
    <div className="grid min-h-screen grid-cols-2">
      <DynamicField action={handleAddField} />
      <DynamicFormGenerator
        data={fields}
        resetForm={() => resetForm()}
        removeField={handleRemoveField}
      />
    </div>
  )
}
