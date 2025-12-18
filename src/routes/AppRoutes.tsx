import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import VendorList from '../pages/Menu/Vendor/VendorList'

const AppRoute = () => {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/vendor" element={<VendorList />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default AppRoute