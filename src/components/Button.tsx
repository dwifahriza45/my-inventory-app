type ButtonProps = {
  text: string | React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  disabled,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default Button;
