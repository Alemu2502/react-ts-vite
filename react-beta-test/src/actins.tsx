import {useState, useTransition, FormEvent} from 'react';

function ActionTransition(){

type message ={
    text: string,
    sender: 'user' | 'bot',
}
const [messages, setMessages] = useState<message[]>([]);
const [input, setInput] = useState<string>('');
const [error, setError] = useState<string | null>(null);
const [isPending, startTransition] = useTransition();

const simulateBotResponse =():Promise<void>=>{
return new Promise((resolve)=>{
setTimeout(()=>{
setMessages((prevMessages)=> [
...prevMessages,
{text: input, sender: 'user'},
{text: 'hello user', sender: 'bot'},
]);
resolve();
},
3000);
});
}
const handleSubmit =(event: FormEvent<HTMLFormElement>)=>{
event.preventDefault();
startTransition(async ()=>{
setInput('');
try {
    await simulateBotResponse();
} catch(error){
    setError("failed to responed");
}
});
}

return (
    <>
<div className='messages'>
{messages.map((message, index)=>(
  <div key ={index} className={`message ${message.sender}`} >
{message.text}
  </div>
))}
</div>
<form onSubmit={handleSubmit}>
<input type='text' value={input} placeholder='type a message' onChange={(e)=>setInput(e.target.value)} required />
<button type='submit' disabled={isPending}>{isPending? 'sending...' :'send'}</button>
{error && <p className='error'>{error}</p>}
</form>
</>
);
}
export default ActionTransition;