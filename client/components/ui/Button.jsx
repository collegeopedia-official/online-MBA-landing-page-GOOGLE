import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  icon = true,
  disabled = false
}) {
  return (
    <button type={type} className={`btn btn-${variant} ${className}`} onClick={onClick} disabled={disabled}>
      <span>{children}</span>
      {icon && <ArrowRight size={18} aria-hidden="true" />}
    </button>
  );
}
