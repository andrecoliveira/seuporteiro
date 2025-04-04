import TextField from '@/components/text-field'
import { Input } from '@/components/ui'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { brazilStates } from '@/utils/brazilStates'

export default function Content() {
  return (
    <form className="flex w-full flex-col gap-5 lg:w-2/3">
      <TextField label="CEP">
        <Input
          required
          id="cepNumber"
          autoComplete="cep"
          minLength={8}
          maxLength={8}
        />
      </TextField>
      <TextField label="Endereço">
        <Input id="street" required maxLength={8} />
      </TextField>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TextField label="Número">
          <Input id="streetNumber" required />
        </TextField>
        <TextField label="Complemento (Opcional)">
          <Input id="complement" />
        </TextField>
      </div>
      <TextField label="Bairro">
        <Input id="neighborhood" maxLength={8} />
      </TextField>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TextField label="Estado">
          <Select>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Selecione seu estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {brazilStates.map((state: string) => (
                  <SelectItem
                    key={state}
                    className="hover:cursor-pointer"
                    value={state}
                  >
                    {state}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </TextField>
        <TextField label="Cidade">
          <Input id="city" maxLength={8} />
        </TextField>
      </div>
    </form>
  )
}
