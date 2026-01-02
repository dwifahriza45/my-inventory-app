import AdminLayout from "../../../components/Layout/AdminLayout"

const DashboardList = () => {
  return (
    <AdminLayout>
      <h2 className="mb-4 text-2xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card title="Users" value="120" />
        <Card title="Orders" value="87" />
        <Card title="Revenue" value="Rp 12jt" />
      </div>
    </AdminLayout>
  )
}

type vendorProps = {
  title: string
  value: string
}

const Card = ({ title, value } : vendorProps) => (
  <div className="rounded-xl bg-gray-50 p-5 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="mt-2 text-2xl font-semibold">{value}</p>
  </div>
)

export default DashboardList