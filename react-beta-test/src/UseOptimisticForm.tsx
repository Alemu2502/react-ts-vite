import { useState, useActionState, useOptimistic } from 'react';

//import { useState } from 'react';
// Make sure to import `useOptimistic` and `useActionState` from their respective sources if they are from a library
import './App.css';

function UseOptimisticForm() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');
  const [optimisticMessages, setOptimisticMessages] = useOptimistic(messages);

  const [error, submitAction, isPending] = useActionState(
    async () => {
      try {
        await simulateBotResponse();
      } catch (error) {
        return 'Failed to simulate bot response'; // Set error message
      }
      return null; // Return null if no error
    },
    null // Initial state for error
  );

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    setOptimisticMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: 'user' },
    ]);

    submitAction(); // Submit the action
    setInput(''); // Clear input field
  };

  return (
    <>
      <div className="messages">
        {optimisticMessages.map((message, index) => (
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
        <button type="submit">
          {isPending ? 'Sending...' : 'Send'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </>
  );
}

export default UseOptimisticForm;
