export function DynamicFormError({
  errorMessage,
}: {
  errorMessage: string | undefined
}) {
  if (!errorMessage) return null

  return <span className="text-red-500 text-xs">{errorMessage} 🛑</span>
}
