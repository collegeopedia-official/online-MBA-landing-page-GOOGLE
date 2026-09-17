import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  icon = true
}) {
  return (
    <button type={type} className={`btn btn-${variant} ${className}`} onClick={onClick}>
      <span>{children}</span>
      {icon && <ArrowRight size={18} aria-hidden="true" />}
    </button>
  );
}
