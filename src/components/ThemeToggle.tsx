import { useTheme } from '../context/ThemeContext'


const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()


    return (
        <button
            onClick={toggleTheme}
            className="absolute right-6 top-6 rounded-full border border-gray-300 px-4 py-1 text-sm text-gray-700 dark:border-gray-600 dark:text-gray-200"
        >
            {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    )
}


export default ThemeToggle