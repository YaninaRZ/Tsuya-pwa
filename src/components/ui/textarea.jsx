import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3",
        "text-sm text-white placeholder:text-white/25",
        "resize-none outline-none transition-colors",
        "focus:border-[#C0C0C0]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
