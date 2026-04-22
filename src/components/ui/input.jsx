import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full bg-transparent py-2 text-sm text-white outline-none",
        "border-b border-white/15 transition-colors",
        "placeholder:text-white/25",
        "focus:border-[#C0C0C0]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
