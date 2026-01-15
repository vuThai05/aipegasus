interface PegasusLogoProps {
  className?: string
  size?: number
}

export function PegasusLogo({ className, size = 32 }: PegasusLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M16 2L4 8v16l12 6 12-6V8L16 2z" fill="currentColor" className="text-primary" />
      <path d="M16 6l-8 4v8l8 4 8-4v-8l-8-4z" fill="currentColor" className="text-background" />
      <path d="M16 10l-4 2v4l4 2 4-2v-4l-4-2z" fill="currentColor" className="text-primary" />
    </svg>
  )
}
