import { createContext, useContext, useState, ReactNode } from 'react'


type Theme = 'light' | 'dark'


type ThemeContextType = {
    theme: Theme
    toggleTheme: () => void
}


const ThemeContext = createContext<ThemeContextType | null>(null)


export const useTheme = () => {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
    return ctx
}


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light')


    const toggleTheme = () => {
        setTheme(t => (t === 'light' ? 'dark' : 'light'))
    }


    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme === 'dark' ? 'dark' : ''}>{children}</div>
        </ThemeContext.Provider>
    )
}