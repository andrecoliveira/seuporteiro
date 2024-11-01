import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button, Input } from '@/components/ui'
import { LoginViewProps } from './login.type'

export default function LoginForm(props: LoginViewProps) {
  const { form } = props
  return (
    <Form {...form}>
      <form className="space-y-6 p-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  autoComplete="email"
                  placeholder="joao@exemplo.com"
                  {...field}
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="••••••••"
                  className="h-12"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="h-12 w-full">
          Entrar
        </Button>
      </form>
    </Form>
  )
}
