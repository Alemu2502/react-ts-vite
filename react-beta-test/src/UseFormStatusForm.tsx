import { useState } from 'react';
import { useFormStatus } from 'react-dom'; // Make sure this is supported in your setup (React 18+)
import './App.css';

function UseFormStatusForm() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');
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

  const submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setInput('');

    try {
      await simulateBotResponse();
    } catch (error) {
      setError('Failed to simulate bot response');
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
      <form onSubmit={submitAction} className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Type a message"
          required
        />
        <button type="submit">
          <Pending>Send</Pending>
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
}

export default UseFormStatusForm;

// Pending Component
function Pending({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus(); // Use form's pending status from the server

  return <>{pending ? 'Sending...' : children}</>;
}
