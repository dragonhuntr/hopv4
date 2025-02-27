"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  RiShareLine,
  RiAttachment2,
} from "@remixicon/react";
import { ChatMessage } from "@/components/chat-message";
import { useRef, useEffect, useState } from "react";

type Message = {
  content: string;
  isUser: boolean;
};

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    setMessages((prev) => [...prev, { content: inputValue, isUser: true }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { content: "This is a placeholder response. In a real implementation, this would be replaced with an actual AI response.", isUser: false },
      ]);
    }, 1000);

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <ScrollArea className="flex-1 [&>div>div]:h-full w-full shadow-md bg-background">
      <div className="h-full flex flex-col px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="py-5 bg-background sticky top-0 z-10 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-gradient-to-r before:from-black/[0.06] before:via-black/10 before:to-black/[0.06]">
          <div className="flex items-center justify-between gap-2">
            <Breadcrumb>
              <BreadcrumbList className="sm:gap-1.5">
                <BreadcrumbItem>
                  <BreadcrumbPage>Example Title</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-1 -my-2 -me-2">
              <Button variant="ghost" className="px-2">
                <RiShareLine
                  className="text-muted-foreground sm:text-muted-foreground/70 size-5"
                  size={20}
                  aria-hidden="true"
                />
                <span className="max-sm:sr-only">Share</span>
              </Button>
            </div>
          </div>
        </div>
        {/* Chat */}
        <div className="relative grow">
          <div className="max-w-3xl mx-auto mt-6 space-y-6">
            {messages.map((message, index) => (
              <ChatMessage key={index} isUser={message.isUser}>
                <p>{message.content}</p>
              </ChatMessage>
            ))}
            <div ref={messagesEndRef} aria-hidden="true" />
          </div>
        </div>
        {/* Footer */}
        <div className="sticky bottom-0 pt-4 md:pt-8 z-9999">
          <div className="max-w-3xl mx-auto bg-background rounded-[20px] pb-4 md:pb-8">
            <div className="relative rounded-[20px] border border-transparent bg-muted transition-colors focus-within:bg-muted/50 focus-within:border-input has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 [&:has(input:is(:disabled))_*]:pointer-events-none">
              <textarea
                className="flex sm:min-h-[84px] w-full bg-transparent px-4 py-3 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none [resize:none]"
                placeholder="Ask me anything..."
                aria-label="Enter your prompt"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              {/* Textarea buttons */}
              <div className="flex items-center justify-between gap-2 p-3">
                {/* Left buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full size-8 border-none hover:bg-background hover:shadow-md transition-[box-shadow]"
                  >
                    <RiAttachment2
                      className="text-muted-foreground/70 size-5"
                      size={20}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Attach</span>
                  </Button>
                </div>
                {/* Right buttons */}
                <div className="flex items-center gap-2">
                  <Button 
                    className="rounded-full h-8"
                    onClick={handleSubmit}
                    disabled={!inputValue.trim()}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
