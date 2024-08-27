// @ts-nocheck
import { useState } from 'react';
import BasicForm from './BasicForm';
import StartTransitionForm from './StartTransitionForm';
import UseTransitionForm from './UseTransitionForm';
import ActionForm from './ActionsForm';
import UseFormStatusForm from './UseFormStatusForm';
import UseActionStateForm from './UseActionStateForm';
import UseOptimisticForm from './UseOptimisticForm';
import useStateExample from './useState.tsx';
import {useCount} from './useStateCount.tsx';
import {Counter} from './useReducer.tsx'
import './App.css';

const formComponents = [
  { label: 'BasicForm', component: BasicForm },
  { label: 'StartTransition Form', component: StartTransitionForm },
  { label: 'UseTransition Form', component: UseTransitionForm },
  { label: 'Action Form', component: ActionForm },
  { label: 'UseFormStatus Form', component: UseFormStatusForm },
  { label: 'UseActionState Form', component: UseActionStateForm },
  { label: 'UseOptimistic Form', component: UseOptimisticForm },
  { label: 'useState', component: useStateExample },
   { label: 'useStatCount', component: useCount },
    { label: 'useReducerCount', component: Counter },
];

function App() {
  const [formNumber, setFormNumber] = useState(0);

  const FormList = () => {
    return (
      <ol className="ol">
        {formComponents.map((Form, index) => (
          <li key={index} onClick={() => setFormNumber(index + 1)}>
            {Form.label}
          </li>
        ))}
      </ol>
    );
    
  };

  const { component: FormComponent } = formComponents[formNumber - 1] ?? {};

  return formNumber === 0 ? (
    <FormList />
  ) : (
    <div className="chat">
      <button className="back-button" onClick={() => setFormNumber(0)}>
        {' '}
        {'<- Back'}
      </button>
      <FormComponent />
    </div>
  );
  
}

export default App;
