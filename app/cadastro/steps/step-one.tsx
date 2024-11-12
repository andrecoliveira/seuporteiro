import { Input, Label } from '@/components/ui'

export default function StepOne() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">Nome do seu negócio</Label>
        <Input
          name="email"
          placeholder="Ex: Verana Cuccina"
          className="h-14"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">Email de contato</Label>
        <Input
          name="email"
          placeholder="joao@exemplo.com.br"
          className="h-14"
          required
        />
      </div>
      <div className="w-full space-y-1">
        <Label htmlFor="pathname">Endereço da página da loja</Label>
        <div className="flex gap-2">
          <div className="flex h-14 items-center rounded-md bg-slate-100 px-4 text-xs font-semibold">
            mesacerta.com/
          </div>
          <Input
            name="pathname"
            placeholder="Ex: veranacuccina"
            className="h-14 w-full"
            required
          />
        </div>
        <span className="text-sm text-gray-500">
          Este será o endereço para acessar a página de sua loja.
        </span>
      </div>
    </div>
  )
}
