'use client'

import { Button, Input, Label } from '@/components/ui'

export default function Form() {
  return (
    <div>
      <h3 className="text-left text-lg font-semibold">Crie sua organização</h3>
      <form className="mt-4 space-y-3">
        <div className="space-y-2">
          <Label htmlFor="email">Nome</Label>
          <Input placeholder="Ex: Gregorio Cuccina" className="h-14" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Slug</Label>
          <Input placeholder="Ex: gregorio-cuccina" className="h-14" required />
          <div className="text-sm font-light text-gray-500">
            O slug é o identificador único da sua organização na URL. Ele deve
            ser composto por letras minúsculas, números e hífens, sem espaços,
            acentos ou caracteres especiais.
          </div>
        </div>
        <div>
          <Button className="mt-6 h-12 w-full">Criar</Button>
        </div>
      </form>
    </div>
  )
}
