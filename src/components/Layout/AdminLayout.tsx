// components/layout/AdminLayout.jsx
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

type AdminLayoutProps = React.PropsWithChildren

const AdminLayout = ({ children } : AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default AdminLayout
