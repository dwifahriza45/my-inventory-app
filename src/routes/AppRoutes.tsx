import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'

const AppRoute = () => {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default AppRoute