import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/products/')({
  component: AdminProducts,
})

function AdminProducts() {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>
      <p>Manage your products here.</p>
    </div>
  )
}