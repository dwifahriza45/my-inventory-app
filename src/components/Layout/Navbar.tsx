// components/layout/Navbar.jsx
const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-white px-6 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-700">
        Admin Panel
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Hi, Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="h-9 w-9 rounded-full"
        />
      </div>
    </header>
  )
}

export default Navbar
