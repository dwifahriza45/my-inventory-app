import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import { AuthProvider } from '../context/AuthContext'
import NotFound from '../pages/NotFound/NotFound'
import GuestRoute from './GuestRoute'
import ProtectedRoute from './ProtectedRoute'
import DashboardList from '../pages/Menu/Dashboard/DashboardList'

const AppRoute = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="*" element={<NotFound />} />

                        {/* GUEST */}
                        <Route
                            path="/login"
                            element={
                                <GuestRoute>
                                    <Login />
                                </GuestRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <GuestRoute>
                                    <Register />
                                </GuestRoute>
                            }
                        />
                        {/* END GUEST */}

                        {/* PROTECT */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <DashboardList />
                                </ProtectedRoute>
                            }
                        />
                        {/* END PROTECT */}
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default AppRoute