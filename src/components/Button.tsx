type ButtonProps = {
  text: string | React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
<<<<<<< HEAD
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

=======
  className?: string
};

const Button = ({ text, type = "button", onClick, disabled }: ButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:bg-gray-400"
  >
    {text}
  </button>
);

>>>>>>> d949834111886c2f77b3c8a3b02298ea0e9180d3
export default Button;
