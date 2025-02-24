import { ChatLayout } from './components/layout/ChatLayout'
import { ChatMessage } from './components/chat/ChatMessage'
import { ChatInput } from './components/chat/ChatInput'

export default function Home() {
  return (
    <ChatLayout>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <ChatMessage
            message="Welcome to ChatScale! 👋"
            sender="System"
            timestamp="Just now"
          />
          <ChatMessage
            message="Hey everyone! Excited to be here."
            sender="John Doe"
            timestamp="2 min ago"
          />
          <ChatMessage
            message="Hello! How's everyone doing?"
            sender="You"
            timestamp="1 min ago"
            isCurrentUser
          />
        </div>
        <ChatInput />
      </div>
    </ChatLayout>
  )
}