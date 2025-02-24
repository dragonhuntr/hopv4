import { Send } from 'lucide-react'
import { cn } from '@/app/lib/utils'

export function ChatInput() {
  return (
    <div className={cn(
      "border-t p-4",
      "bg-white dark:bg-gray-950"
    )}>
      <form className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className={cn(
            "flex-1 p-2 rounded-lg",
            "bg-gray-100 dark:bg-gray-800",
            "focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
        />
        <button
          type="submit"
          className={cn(
            "p-2 rounded-lg",
            "bg-blue-500 hover:bg-blue-600",
            "text-white"
          )}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}
