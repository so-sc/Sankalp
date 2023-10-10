import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import React, { HTMLAttributes } from "react"
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai"

const notificationVariants = cva(
  "flex items-center gap-4 border px-8 py-4 rounded-lg",
  {
    variants: {
      variant: {
        info: "bg-blue-500/10 border-blue-500",
        warning: "bg-amber-500/10 border-amber-500",
        success: "bg-green-500/10 border-green-500",
        error: "bg-red-500/10 border-red-500",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const icons = {
  info: AiOutlineInfoCircle,
  warning: AiOutlineWarning,
  error: AiOutlineExclamationCircle,
  success: AiOutlineCheckCircle,
}

interface NotificationProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  children: React.ReactNode
}

export default function Notification({
  children,
  variant,
  className,
  ...props
}: NotificationProps) {
  return (
    <div
      className={cn(notificationVariants({ variant, className }))}
      {...props}
    >
      {/* Getting icons based on the variant*/}
      <p>
        {React.createElement(icons[variant!], {
          className: "text-2xl",
        })}
      </p>
      {children}
    </div>
  )
}
