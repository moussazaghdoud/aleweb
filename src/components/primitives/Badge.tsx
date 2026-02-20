interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "purple" | "outline";
  className?: string;
}

const variantStyles = {
  default: "bg-neutral-200 text-neutral-800",
  purple: "bg-ale-purple-100 text-ale-purple-700",
  outline: "border border-ale-purple-300 text-ale-purple-600",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-[--radius-full] px-3 py-1 text-xs font-medium tracking-wide uppercase ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
