type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
};

const Input = ({ label, type = 'text', placeholder, name, value, onChange, error }: InputProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`rounded-lg px-3 py-2 text-sm outline-none transition bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border
        ${
          error
            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
            : 'border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500'
        }
      `}
    />

    {error && (
      <p className="text-xs text-red-500 mt-1">
        {error}
      </p>
    )}
  </div>
);

export default Input;