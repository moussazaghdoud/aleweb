import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark" | "white";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-ale-purple text-white hover:bg-ale-purple-dark shadow-sm hover:shadow-purple",
  secondary:
    "border-2 border-ale-purple text-ale-purple hover:bg-ale-purple-50",
  ghost:
    "text-ale-purple hover:text-ale-purple-dark underline-offset-4 hover:underline",
  dark:
    "bg-neutral-950 text-white hover:bg-neutral-900",
  white:
    "bg-white text-ale-purple hover:bg-ale-purple-50 shadow-sm",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-8 text-base gap-2",
  xl: "h-14 px-10 text-lg gap-2.5",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  icon,
  iconRight,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-[--radius-md] transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-ale-purple focus-visible:outline-offset-2";

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </button>
  );
}
