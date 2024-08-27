import { useReducer } from "react";

// Define the shape of the state
type State = { count: number };

// Define action types and their payloads
type Action = 
  | { type: 'Increment' }
  | { type: 'Decrement' }
   | {type: 'Reset'};
// Define the initial state
const initialState: State = { count: 0 };

// Define the reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'Increment':
      return { count: state.count + 1 };
    case 'Decrement':
      return { count: state.count - 1 };
    case 'Reset':
        return {count: 0};  
    default:
      return state;
  }
};

// Define the functional component
export const Counter =()=> {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Event handler to dispatch actions
  const handleIncrement = () => dispatch({ type: 'Increment' });
  const handleDecrement = () => dispatch({ type: 'Decrement' });
  const handleReset =()=>dispatch({type: 'Reset'});

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
       <button onClick={handleReset}>Reset</button>
    </div>
  );
}
