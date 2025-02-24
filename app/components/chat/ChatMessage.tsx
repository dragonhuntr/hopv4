import { cn } from '@/app/lib/utils'

interface ChatMessageProps {
  message: string
  sender: string
  timestamp: string
  isCurrentUser?: boolean
}

export function ChatMessage({ message, sender, timestamp, isCurrentUser }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex gap-3 p-4",
      isCurrentUser && "flex-row-reverse"
    )}>
      <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
      <div className={cn(
        "flex flex-col gap-1",
        isCurrentUser && "items-end"
      )}>
        <div className="flex items-center gap-2">
          <span className="font-medium">{sender}</span>
          <span className="text-sm text-gray-500">{timestamp}</span>
        </div>
        <div className={cn(
          "p-3 rounded-lg max-w-md",
          isCurrentUser
            ? "bg-blue-500 text-white"
            : "bg-gray-100 dark:bg-gray-800"
        )}>
          {message}
        </div>
      </div>
    </div>
  )
}
