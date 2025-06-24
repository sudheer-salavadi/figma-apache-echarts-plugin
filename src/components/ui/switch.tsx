import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps {
  checked?: boolean
  onChange?: () => void
  size?: "default" | "sm" | "lg"
  className?: string
  disabled?: boolean
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, size = "default", checked = false, onChange, disabled = false, ...props }, ref) => (
    <label
      className={cn(
        "relative inline-flex cursor-pointer items-center",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <input
        type="checkbox"
        ref={ref}
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <div
        className={cn(
          "relative rounded-full bg-input transition-colors duration-200 ease-in-out",
          "peer-checked:bg-primary",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          {
            "h-5 w-9": size === "default",
            "h-4 w-7": size === "sm",
            "h-6 w-11": size === "lg",
          }
        )}
      >
        <div
          className={cn(
            "absolute left-0.5 top-0.5 rounded-full bg-background transition-transform duration-200 ease-in-out",
            {
              "h-4 w-4": size === "default",
              "h-3 w-3": size === "sm", 
              "h-5 w-5": size === "lg",
            },
            checked && {
              "translate-x-4": size === "default",
              "translate-x-3": size === "sm",
              "translate-x-5": size === "lg",
            }
          )}
        />
      </div>
    </label>
  )
)
Switch.displayName = "Switch"

export { Switch }