import { Button, Input, Label } from '@/components/ui'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function RestaurantPage() {
  return (
    <div className="w-full space-y-6 xl:w-6/12">
      <h3 className="text-3xl font-semibold text-slate-800">Restaurante</h3>
      <Card className="divide-y divide-gray-200">
        <CardHeader>
          <CardTitle>Dados do estabelecimento</CardTitle>
          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-4">
            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label
                htmlFor="restaurant_name"
                className="font-normal md:mb-0 md:w-80"
              >
                Nome da loja
              </Label>
              <div className="relative w-full md:left-[-2px]">
                <Input name="restaurant_name" className="h-10 pr-16" required />
                <span className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500">
                  15 / 40
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label htmlFor="phone" className="font-normal md:mb-0 md:w-80">
                Telefone
              </Label>
              <Input name="phone" className="h-10" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label htmlFor="category" className="font-normal md:mb-0 md:w-80">
                Categoria
              </Label>
              <Input name="category" className="h-10" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label
                htmlFor="description"
                className="font-normal md:mb-0 md:w-80"
              >
                Descrição
              </Label>
              <Input name="description" className="h-10" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label
                htmlFor="instagram"
                className="font-normal md:mb-0 md:w-80"
              >
                Instagram
              </Label>
              <div className="relative w-full md:left-[-2px]">
                <Input name="instagram" className="h-10 pl-28" required />
                <span className="absolute inset-y-0 left-3 flex items-center text-xs text-gray-500">
                  instagram.com/
                </span>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 pt-6">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar</Button>
        </CardFooter>
      </Card>

      <Card className="divide-y divide-gray-200">
        <CardHeader>
          <CardTitle>Endereço</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form className="space-y-4">
            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label htmlFor="cep" className="font-normal md:mb-0 md:w-80">
                CEP
              </Label>
              <Input name="cep" className="h-10" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label htmlFor="address" className="font-normal md:mb-0 md:w-80">
                Endereço
              </Label>
              <Input name="address" className="h-10" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label
                htmlFor="street_number"
                className="font-normal md:mb-0 md:w-80"
              >
                Número
              </Label>
              <Input name="street_number" className="h-10" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label
                htmlFor="complement"
                className="font-normal md:mb-0 md:w-80"
              >
                Complemento (Opcional)
              </Label>
              <Input name="complement" className="h-10" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label
                htmlFor="neighborhood"
                className="font-normal md:mb-0 md:w-80"
              >
                Bairro
              </Label>
              <Input name="neighborhood" className="h-10" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label htmlFor="city" className="font-normal md:mb-0 md:w-80">
                Cidade
              </Label>
              <Input name="city" className="h-10" required />
            </div>

            <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:space-y-0">
              <Label htmlFor="state" className="font-normal md:mb-0 md:w-80">
                Estado
              </Label>
              <Input name="state" className="h-10" required />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 pt-6">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
