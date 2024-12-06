"use client";

import { ChatMessage, ChatMessages, useChatUI } from "@llamaindex/chat-ui";
import { ChatMessageAvatar } from "./chat-avatar";
import { ChatMessageContent } from "./chat-message-content";
import { ChatStarter } from "./chat-starter";
import { useEffect, useState } from 'react';

export default function CustomChatMessages() {
  const { messages, isLoading } = useChatUI();
  const [loadingMessage, setLoadingMessage] = useState("Думаю над ответом");

  useEffect(() => {
    if (!isLoading) {
      setLoadingMessage("Думаю над ответом");
      return;
    }

    const timer5sec = setTimeout(() => {
      setLoadingMessage("Все еще думаю");
    }, 5000);

    const timer15sec = setTimeout(() => {
      setLoadingMessage("Все еще думаю, но попробуйте обновить страницу, если ничего не меняется");
    }, 15000);

    return () => {
      clearTimeout(timer5sec);
      clearTimeout(timer15sec);
    };
  }, [isLoading]);

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
            {loadingMessage}
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
