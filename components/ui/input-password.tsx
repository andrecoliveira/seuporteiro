import * as React from 'react'
import { cn } from '@/lib/utils'
import { EyeIcon, EyeClosedIcon } from 'lucide-react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    const [inputType, setInputType] = React.useState(type)

    const toggleVisibility = () => {
      setInputType((prevType) =>
        prevType === 'password' ? 'text' : 'password',
      )
    }

    return (
      <div className="relative w-full">
        <input
          type={inputType}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
          >
            {inputType === 'password' ? (
              <EyeIcon size={18} />
            ) : (
              <EyeClosedIcon size={18} />
            )}
          </button>
        )}
      </div>
    )
  },
)
InputPassword.displayName = 'Input'

export { InputPassword }
