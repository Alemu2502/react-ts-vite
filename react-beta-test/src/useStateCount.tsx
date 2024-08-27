import {useState} from 'react';

export const useCount =()=> {
const [count, setCount] = useState(1000);

const handleClick =(e: React.MouseEvent<HTMLButtonElement>)=> {
e.preventDefault();
Increment();
}
const handleClick1 =(e: React.MouseEvent<HTMLButtonElement>)=> {
e.preventDefault();
Decrement();
}

const Increment =()=>{
setCount(preveCount=>preveCount + 1);
}
const Decrement =()=>{
setCount(preveCount=>preveCount - 1);
}


return (
<>
<button onClick={handleClick}>+</button>
<span>{count}</span>
<button onClick={handleClick1}>-</button>
</>
);


}