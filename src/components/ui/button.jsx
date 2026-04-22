import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-xs font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-white/10 bg-transparent text-white/60 hover:bg-white/05 hover:text-white",
        secondary: "bg-white/05 text-white/60 hover:bg-white/10",
        ghost: "bg-transparent text-white/60 hover:bg-white/05 hover:text-white",
        link: "text-accent underline-offset-4 hover:underline",
        silver: "bg-[#C0C0C0] text-[#0A0A0A] hover:bg-[#D0D0D0]",
      },
      size: {
        default: "h-11 px-6 py-3 tracking-widest",
        sm: "h-8 px-3 py-2 text-xs",
        lg: "h-12 px-8 tracking-widest",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
