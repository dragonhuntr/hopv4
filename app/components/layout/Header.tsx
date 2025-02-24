import { Menu, Settings } from 'lucide-react'
import { cn } from '@/app/lib/utils'

export function Header() {
  return (
    <header className={cn(
      "h-14 border-b px-4 flex items-center justify-between",
      "bg-white dark:bg-gray-950"
    )}>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">ChatScale</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
