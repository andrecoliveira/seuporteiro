import { Button, Input, Label } from '@/components/ui'
import { SquarePen } from 'lucide-react'

export default function RestaurantPage() {
  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-semibold text-slate-800">Restaurante</h3>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold">Informações</h2>
          <Button variant="outline">
            Editar <SquarePen />
          </Button>
        </div>

        <div>
          <form className="space-y-2">
            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label
                htmlFor="instagram"
                className="font-normal md:mb-0 md:w-48"
              >
                Nome da loja
              </Label>
              <div className="relative w-full">
                <Input name="restaurant_name" className="pr-16" required />
                <span className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500">
                  15 / 40
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label
                htmlFor="instagram"
                className="font-normal md:mb-0 md:w-48"
              >
                Telefone
              </Label>
              <Input name="phone" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label
                htmlFor="instagram"
                className="font-normal md:mb-0 md:w-48"
              >
                Categoria
              </Label>
              <Input name="category" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label
                htmlFor="instagram"
                className="font-normal md:mb-0 md:w-48"
              >
                Descrição
              </Label>
              <Input name="description" required />
            </div>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold">Endereço</h2>
          <Button variant="outline">
            Editar <SquarePen />
          </Button>
        </div>

        <div>
          <form className="space-y-2">
            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label htmlFor="cep" className="font-normal md:mb-0 md:w-48">
                CEP
              </Label>
              <Input name="cep" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label htmlFor="address" className="font-normal md:mb-0 md:w-48">
                Endereço
              </Label>
              <Input name="address" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label
                htmlFor="street_number"
                className="font-normal md:mb-0 md:w-48"
              >
                Número
              </Label>
              <Input name="street_number" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label
                htmlFor="complement"
                className="font-normal md:mb-0 md:w-48"
              >
                Complemento
              </Label>
              <Input name="complement" placeholder="Opcional" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label
                htmlFor="neighborhood"
                className="font-normal md:mb-0 md:w-48"
              >
                Bairro
              </Label>
              <Input name="neighborhood" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label htmlFor="city" className="font-normal md:mb-0 md:w-48">
                Cidade
              </Label>
              <Input name="city" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label htmlFor="state" className="font-normal md:mb-0 md:w-48">
                Estado
              </Label>
              <Input name="state" required />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
