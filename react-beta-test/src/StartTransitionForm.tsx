import { useState, startTransition } from 'react';
import './App.css';

function StartTransitionForm() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    try {
      // Start asynchronous operation
      await simulateBotResponse();
    } catch (error) {
      setError('Something went wrong!');
    } finally {
      // Set non-urgent state changes inside startTransition
      startTransition(() => {
        setIsLoading(false);
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
}

export default StartTransitionForm;
