import {
  ChatMessage,
  ContentPosition,
  getSourceAnnotationData,
  useChatMessage,
  useChatUI,
} from "@llamaindex/chat-ui";
import { Markdown } from "./custom/markdown";
import { ToolAnnotations } from "./tools/chat-tools";
import { TypingEffect } from "./custom/typing-effect";
import { useState } from "react";

export function ChatMessageContent() {
  const { message } = useChatMessage();
  const { messages } = useChatUI();
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  const isFirstMessage = messages[0]?.id === message.id;
  
  const customContent = [
    {
      position: ContentPosition.MARKDOWN,
      component: isFirstMessage && !isTypingComplete ? (
        <TypingEffect 
          text={message.content}
          onComplete={() => setIsTypingComplete(true)}
          className="custom-markdown"
        />
      ) : (
        <Markdown
          content={message.content}
          sources={getSourceAnnotationData(message.annotations)?.[0]}
        />
      ),
    },
    {
      position: ContentPosition.AFTER_EVENTS,
      component: <ToolAnnotations message={message} />,
    },
  ];

  return <ChatMessage.Content content={customContent} />;
}
