// components/layout/Sidebar.tsx
import type { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import {
  MdDashboard,
  MdPeople,
  MdKey,
} from "react-icons/md"

const Sidebar = () => {
  return (
    <aside className="min-h-[calc(100vh-4rem)] w-64 bg-gray-900 text-gray-200">
      <nav className="flex flex-col gap-2 p-4">
        <SidebarItem icon={<MdDashboard />} label="Dashboard" to="/dashboard" />
        <SidebarItem icon={<MdPeople />} label="Users Management" to="/users" />
        <SidebarItem icon={<MdKey />} label="Roles Management" to="/roles" />
      </nav>
    </aside>
  )
}

type SidebarItemProps = {
  icon: ReactNode
  label: string
  to: string
}

const SidebarItem = ({ icon, label, to }: SidebarItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition
       ${isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"}`
    }
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </NavLink>
)

export default Sidebar
