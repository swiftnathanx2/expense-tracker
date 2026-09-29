import "./Button.css";

export function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn--${variant} ${className}`}
    >
      {children}
    </button>
  );
}
