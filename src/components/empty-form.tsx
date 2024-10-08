import { Recycle } from 'lucide-react'

export function EmptyForm() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Recycle className="w-5 h-5 text-rose-700" />
      <span className="text-rose-700">Reinicie o formulário</span>
    </div>
  )
}
