import { useEffect, useState } from "react"
import { MdEdit, MdDelete } from "react-icons/md"
import { BASE_URL } from "../../../utils/data"

type Role = {
  id: number
  name: string
}

const RolesList = () => {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const token = localStorage.getItem("accessToken")

  // Fetch semua roles
  const fetchRoles = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`${BASE_URL}/roles/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({}),
      })

      const text = await res.text()
      if (!res.ok) throw new Error(`Failed to fetch roles: ${res.status} ${text}`)

      const json = JSON.parse(text)
      const rolesArray: Role[] = Array.isArray(json?.data?.results) ? json.data.results : []
      setRoles(rolesArray)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to fetch roles")
      setRoles([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  // Create role
  const handleCreate = async () => {
    const name = prompt("Enter new role name:")
    if (!name) return

    try {
      const res = await fetch(`${BASE_URL}/roles/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ name }),
      })

      const text = await res.text()
      if (!res.ok) throw new Error(`Failed to create role: ${res.status} ${text}`)

      const newRole: Role = JSON.parse(text)
      alert(`Role "${newRole.name}" created successfully!`)
      setRoles(prev => [...prev, newRole])
    } catch (err: any) {
      console.error(err)
      alert(err.message)
    }
  }

  // Edit role
  const handleEdit = async (role: Role) => {
    const name = prompt("Edit role name:", role.name)
    if (!name || name === role.name) return

    try {
      const res = await fetch(`${BASE_URL}/roles/${role.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ name }),
      })

      const text = await res.text()
      if (!res.ok) throw new Error(`Failed to update role: ${res.status} ${text}`)

      const updatedRole: Role = JSON.parse(text)
      setRoles(prev => prev.map(r => (r.id === updatedRole.id ? updatedRole : r)))
      alert(`Role "${updatedRole.name}" updated!`)
    } catch (err: any) {
      console.error(err)
      alert(err.message)
    }
  }

  // Delete role
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this role?")) return

    try {
      const res = await fetch(`${BASE_URL}/roles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })

      const text = await res.text()
      if (!res.ok) throw new Error(`Failed to delete role: ${res.status} ${text}`)

      setRoles(prev => prev.filter(r => r.id !== id))
      alert("Role deleted successfully!")
    } catch (err: any) {
      console.error(err)
      alert(err.message)
    }
  }

  // Render
  if (loading) return <p className="p-6 text-gray-600">Loading...</p>
  if (error) return <p className="p-6 text-red-500">{error}</p>

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Roles Management</h1>
        <button
          onClick={handleCreate}
          className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 shadow-md transition"
        >
          Create Role
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-white shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Role Name</th>
              <th className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {roles.length > 0 ? (
              roles.map((role, index) => (
                <tr key={role.id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 font-medium">{role.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(role)}
                        className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 shadow-sm transition"
                        title="Edit role"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(role.id)}
                        className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600 shadow-sm transition"
                        title="Delete role"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-6 text-center text-gray-500">
                  No roles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RolesList
