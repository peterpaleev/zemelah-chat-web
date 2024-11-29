import { useChatUI } from "@llamaindex/chat-ui";
import { useEffect, useState } from "react";
import { useClientConfig } from "./hooks/use-config";
import { StarterQuestions } from "@llamaindex/chat-ui/widgets";

export function ChatStarter() {
  const { append, messages } = useChatUI();
  const { backend } = useClientConfig();
  const [starterQuestions, setStarterQuestions] = useState<string[]>();

  // Check if there are any user messages
  const hasUserMessages = messages.some(message => message.role === 'user');

  useEffect(() => {
    if (!starterQuestions) {
      fetch(`${backend}/api/chat/config`)
        .then((response) => response.json())
        .then((data) => {
          if (data?.starterQuestions) {
            setStarterQuestions(data.starterQuestions);
          }
        })
        .catch((error) => console.error("Error fetching config", error));
    }
  }, [starterQuestions, backend]);

  // Don't show starter questions if there are user messages
  if (!starterQuestions?.length || hasUserMessages) return null;
  
  return <StarterQuestions append={append} questions={starterQuestions} />;
}
