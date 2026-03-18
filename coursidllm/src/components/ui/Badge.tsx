import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "purple" | "green" | "blue";
  className?: string;
}

const variantClasses = {
  default: "bg-[#f7f9fa] border-[#d1d7dc] text-[#6a6f73]",
  purple: "bg-[#a435f0]/10 border-[#a435f0]/20 text-[#a435f0]",
  green: "bg-[#1e7e34]/10 border-[#1e7e34]/20 text-[#1e7e34]",
  blue: "bg-[#0056d2]/10 border-[#0056d2]/20 text-[#0056d2]",
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border rounded-full px-2 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
