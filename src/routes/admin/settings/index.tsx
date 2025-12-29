import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/settings/')({
  component: AdminSettings,
})

function AdminSettings() {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>Configure your settings here.</p>
    </div>
  )
}