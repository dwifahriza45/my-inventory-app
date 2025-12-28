// src/components/Button.tsx
interface ButtonProps {
  text: string;
  onClick?: () => void; // Pastikan baris ini ada
  type?: "button" | "submit" | "reset";
}

const Button = ({ text, onClick, type = "button" }: ButtonProps) => (
  <button 
    type={type}
    onClick={onClick} // Pastikan onClick dipasang di sini
    className="w-full rounded-lg bg-indigo-600 py-2.5 text-white hover:bg-indigo-700 transition-colors"
  >
    {text}
  </button>
);

export default Button;