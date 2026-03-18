import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const variantClasses = {
  primary: "bg-[#0056d2] hover:bg-[#004ab3] text-white",
  outline: "border border-[#0056d2] text-[#0056d2] hover:bg-[#0056d2] hover:text-white",
  ghost: "text-[#3d3d3d] hover:bg-[#f7f9fa]",
  danger: "bg-[#c0392b] hover:bg-[#a93226] text-white",
};

const sizeClasses = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-5 py-2",
  lg: "text-base px-8 py-3",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
