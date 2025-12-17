import { ThemeProvider } from './context/ThemeContext'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import ThemeToggle from './components/ThemeToggle'


export default function App() {
  return (
    <ThemeProvider>
      <div className="relative flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
        <ThemeToggle />
        <div className="grid w-full max-w-3xl grid-cols-1 gap-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800 md:grid-cols-2">
          <LoginForm />
          <RegisterForm />
        </div>
      </div>
    </ThemeProvider>
  )
}