const Button = ({ text }: { text: string }) => (
    <button className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
        {text}
    </button>
)


export default Button