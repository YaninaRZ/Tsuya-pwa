import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white/[0.07] text-white/60 border border-white/10",
        silver: "border border-[#C0C0C0]/30 text-[#C0C0C0]",
        destructive: "bg-red-500/10 text-red-400 border border-red-500/20",
        outline: "border border-white/15 text-white/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
