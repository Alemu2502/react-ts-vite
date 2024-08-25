import { useState, startTransition } from 'react';
import './App.css';

function UseActionStateForm() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulateBotResponse = (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: input, sender: 'user' },
          { text: 'Hello, user!', sender: 'bot' },
        ]);
        resolve();
      }, 3000);
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setInput('');
    setIsPending(true);

    try {
      await simulateBotResponse();
    } catch (error) {
      setError('Failed to simulate bot response');
    } finally {
      startTransition(() => {
        setIsPending(false);
      });
    }
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

export default UseActionStateForm;
