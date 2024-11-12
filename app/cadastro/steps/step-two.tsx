import { Input, Label } from '@/components/ui'

export default function StepTwo() {
  return (
    <div>
      <div className="space-y-1">
        <Label htmlFor="legalResponsibleName">Nome do responsável</Label>
        <Input
          name="legalResponsibleName"
          placeholder="Ex: João Pedro Filho"
          className="h-14"
          required
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="type">Tipo do negócio</Label>
        <Input
          name="type"
          placeholder="Ex: Verana Cuccina"
          className="h-14"
          required
        />
        {/* Restaurante - Cafeteria - Bar / Casa Noturna - Comida Rápida -
              Outro negócio gastronômico - Outro negócio não gastronômico */}
      </div>
      <div className="space-y-1">
        <Label htmlFor="promotionalCode">Código promocional</Label>
        <Input
          name="promotionalCode"
          placeholder="Ex: Verana Cuccina"
          className="h-14"
          required
        />
      </div>
    </div>
  )
}
