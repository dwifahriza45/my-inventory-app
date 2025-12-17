type InputProps = {
    label: string
    type?: string
    placeholder?: string
}


const Input = ({ label, type = 'text', placeholder }: InputProps) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-indigo-500"
        />
    </div>
)


export default Input