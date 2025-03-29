export default function TextField({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <div className="w-full space-y-1">
      <label className="block pb-1 text-sm font-semibold text-black">
        {label}
      </label>
      {children}
    </div>
  )
}
