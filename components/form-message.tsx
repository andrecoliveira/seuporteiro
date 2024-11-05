export type Message =
  | { success: string }
  | { error: string }
  | { message: string }

interface FormMessageProps {
  message: Message
  translations: Record<string, { description: string }>
}

export function FormMessage({ message, translations }: FormMessageProps) {
  return (
    <>
      {'success' in message && (
        <div className="border-l-2 border-foreground px-4 text-foreground">
          {message.success}
        </div>
      )}
      {'error' in message && (
        <div
          className="rounded-lg bg-red-50 p-4 text-sm text-red-800"
          role="alert"
        >
          {translations[message.error]?.description || message.error}
        </div>
      )}
      {'message' in message && (
        <div className="border-l-2 px-4 text-foreground">{message.message}</div>
      )}
    </>
  )
}
