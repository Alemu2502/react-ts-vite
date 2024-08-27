import { startTransition, useState } from 'react';
import { useFormStatus } from 'react-dom'; // Make sure this is supported in your setup (React 18+)
import './App.css';

function UseFormStatusForm() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);


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
    setPending(true);
    try {
      await simulateBotResponse();
    } catch (error) {
      setError('Failed to simulate bot response');
    } finally {
      startTransition(()=>{
        setPending(false);
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
      <form onSubmit={submitAction} className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Type a message"
          required
        />
        <button type="submit" disabled={pending}>{pending?'sending...':'send'}</button>
        {error && <p className="error">{error}</p>}
      </form>
    </>
   );
}

export default UseFormStatusForm;
