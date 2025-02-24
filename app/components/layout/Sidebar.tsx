import { Hash, MessageSquare, Users } from 'lucide-react'
import { cn } from '@/app/lib/utils'

export function Sidebar() {
  return (
    <aside className={cn(
      "w-64 border-r flex flex-col",
      "bg-gray-50 dark:bg-gray-900"
    )}>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        <nav className="space-y-1">
          <SidebarItem
            icon={<Hash />}
            label="Public Channels"
            active
          />
          <SidebarItem
            icon={<Users />}
            label="Private Groups"
          />
          <SidebarItem
            icon={<MessageSquare />}
            label="Direct Messages"
          />
        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div>
            <div className="font-medium">User Name</div>
            <div className="text-sm text-gray-500">Online</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}

function SidebarItem({ icon, label, active }: SidebarItemProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-3 w-full p-2 rounded-lg",
        "hover:bg-gray-200 dark:hover:bg-gray-800",
        active && "bg-gray-200 dark:bg-gray-800"
      )}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </button>
  )
}
