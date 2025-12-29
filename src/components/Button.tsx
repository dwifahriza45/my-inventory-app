type ButtonProps = {
  text: string | React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
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

export default Button;
