// components/layout/Navbar.tsx
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user, logout } = useContext(AuthContext)!;
  
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = (): void => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-white px-6 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-700">
        Admin Panel
      </h1>

      <div className="relative flex items-center gap-3" ref={dropdownRef}>
        <span className="text-sm text-gray-600">Hi, {user?.username ?? "User"}</span>

        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="h-9 w-9 cursor-pointer rounded-full border"
          onClick={() => setOpen((prev) => !prev)}
        />

        {open && (
          <div className="absolute right-0 top-12 w-40 rounded-lg border bg-white shadow-md">
            <button
              type="button"
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              onClick={() => {
                setOpen(false);
                // navigate("/profile");
              }}
            >
              Profile
            </button>

            <button
              type="button"
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
