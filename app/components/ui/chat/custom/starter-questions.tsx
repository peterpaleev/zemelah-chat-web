'use client'

import { Button } from "../../button";

interface StarterQuestionsProps {
  questions: string[];
  append: (message: { role: 'user' | 'assistant' | 'system'; content: string }) => void;
}
export function StarterQuestions({ questions, append }: StarterQuestionsProps) {
  return (
    <div className="absolute bottom-6 left-0 w-full">
      <div className="mx-20 grid gap-2">
        {questions.map((question, i) => (
          <Button
            key={i}
            variant="outline"
            onClick={() => append({ role: 'user', content: question })}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
}
