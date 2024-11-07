import { Button } from '@/components/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SquarePen, SquareArrowOutUpRight } from 'lucide-react'

export default function RestaurantPage() {
  const account = [
    { label: 'Nome da loja', value: 'Andre Cuccina' },
    { label: 'Telefone', value: '(85) 99974-9025' },
    { label: 'Categoria', value: 'Pizza' },
    {
      label: 'Descrição',
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tincidunt justo est, et pretium turpis scelerisque a. Cras fermentum tortor sed tincidunt accumsan. Nunc commodo lorem a nunc rutrum auctor. Donec et commodo urna. Vivamus accumsan elit velit, dignissim varius leo placerat malesuada. Nullam ultrices pellentesque auctor. Suspendisse vestibulum auctor orci, non luctus tortor rutrum ac. Integer non pellentesque lorem, id aliquet erat. Proin egestas velit ex, vitae lobortis nisl imperdiet et. Integer et ultrices turpis, sed scelerisque magna.',
    },
  ]

  function ListItems({ label, value }: { label: string; value: string }) {
    return (
      <div className="md:items-top md:items-top flex flex-col space-y-2 md:flex-row md:space-y-0">
        <span className="text-sm text-gray-500 md:mb-0 md:basis-1/4">
          {label}
        </span>
        <span className="text-sm md:basis-3/4">{value}</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h3 className="text-3xl font-semibold text-slate-800">Restaurante</h3>
        <Button>
          Ver a loja <SquareArrowOutUpRight />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Detalhes da conta
            <Button variant="outline">
              Editar <SquarePen />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {account.map((item) => (
              <ListItems
                key={item.label}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
