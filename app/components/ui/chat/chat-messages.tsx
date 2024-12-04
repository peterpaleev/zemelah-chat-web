"use client";

import { ChatMessage, ChatMessages, useChatUI } from "@llamaindex/chat-ui";
import { ChatMessageAvatar } from "./chat-avatar";
import { ChatMessageContent } from "./chat-message-content";
import { ChatStarter } from "./chat-starter";

export default function CustomChatMessages() {
  const { messages } = useChatUI();
  return (
    <ChatMessages className="rainbow-shadow shadow-xl rounded-xl">
      <ChatMessages.List>
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            isLast={index === messages.length - 1}
          >
            <ChatMessageAvatar />
            <ChatMessageContent />
            <ChatMessage.Actions />
          </ChatMessage>
        ))}
        <ChatMessages.Loading>
          <span className="text-gray-500 animate-pulse">
            Думаю над ответом
            <span className="inline-flex w-4">
              <span className="animate-[ellipsis_1s_infinite]">.</span>
              <span className="animate-[ellipsis_1s_infinite_333ms]">.</span>
              <span className="animate-[ellipsis_1s_infinite_667ms]">.</span>
            </span>
          </span>
        </ChatMessages.Loading>
      </ChatMessages.List>
      <ChatStarter />
    </ChatMessages>
  );
}
