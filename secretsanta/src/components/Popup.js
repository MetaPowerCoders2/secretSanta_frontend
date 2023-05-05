import './Popup.css';
import Input from './Input';
import { useState } from 'react';

export default function Popup(props) {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  function submitRegister(e){
    e.preventDefault();
    e.target.reset();
  }

  return (<>
  {props.show &&
  <div className="popup">
    <form className="login-form" onSubmit={submitRegister}>
    <h3 className="text">{props.title}</h3>
    {props.displayInputs &&
      <div className="content">
        <Input label={"name"} value={name} type={"text"} placeholder={"add your name"} onChange={(e) => setName(e.target.value)}/>
        <Input label={"email"} value={email} type={"text"} placeholder={"add your email"} onChange={(e) => setEmail(e.target.value)}/>
        <div className='inline'>
        <button>save</button>
        <button onClick={() => props.setShow(false)}>close</button>
      </div>
    </div>}
    </form>
  </div>}
  </>
  );
}
