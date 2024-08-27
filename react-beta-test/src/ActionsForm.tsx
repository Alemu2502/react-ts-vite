import { useState, useTransition, FormEvent } from 'react';
import './App.css';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

function UseTransitionForm() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const simulateBotResponse = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: input, sender: 'user' },
          { text: 'Hello, user!', sender: 'bot' },
        ]);
        resolve();
      }, 5000);
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      setInput('');
      try {
        // Simulate bot response
        await simulateBotResponse();
      } catch (error) {
        setError('Failed to simulate bot response');
      }
    });
  };

  return (
    <>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Type a message"
          required
        />
        <button type="submit" disabled={isPending}>
          {isPending ? 'Sending...' : 'Send'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
}

export default UseTransitionForm;
