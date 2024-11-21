"use client";

import { ChatSection as ChatSectionUI } from "@llamaindex/chat-ui";
import "@llamaindex/chat-ui/styles/code.css";
import "@llamaindex/chat-ui/styles/katex.css";
import "@llamaindex/chat-ui/styles/pdf.css";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import CustomChatInput from "./ui/chat/chat-input";
import CustomChatMessages from "./ui/chat/chat-messages";
import { useClientConfig } from "./ui/chat/hooks/use-config";

export default function ChatSection() {
  const { backend } = useClientConfig();
  const [initialMessage, setInitialMessage] = useState<any>(null);
  
  useEffect(() => {
    fetch(`${backend}/api/chat/config`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.initialMessage) {
          setInitialMessage(data.initialMessage);
        }
      })
      .catch((error) => console.error("Error fetching config", error));
  }, [backend]);

  const handler = useChat({
    api: `${backend}/api/chat`,
    initialMessages: initialMessage ? [initialMessage] : [],
    onError: (error: unknown) => {
      if (!(error instanceof Error)) throw error;
      alert(JSON.parse(error.message).detail);
    },
  });

  return (
    <ChatSectionUI handler={handler} className="w-full h-full">
      <CustomChatMessages />
      <CustomChatInput />
    </ChatSectionUI>
  );
}
