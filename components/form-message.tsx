export type Message =
  | { success: string }
  | { error: string }
  | { message: string }

export function FormMessage({ message }: { message: Message }) {
  return (
    <>
      {'success' in message && (
        <div className="border-l-2 border-foreground px-4 text-foreground">
          {message.success}
        </div>
      )}
      {'error' in message && (
        <div
          className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {message.error}
        </div>
      )}
      {'message' in message && (
        <div className="border-l-2 px-4 text-foreground">{message.message}</div>
      )}
    </>
  )
}
