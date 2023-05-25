import './Popup.css';
import Input from './Input';
import { useState } from 'react';
import fetchData from '../utils/fetchData'

export default function Popup(props) {

  const [id] = useState(props.id);

  function submitRegister(e){
    e.preventDefault();
    e.target.reset();
    if(id){
      const member = {
        id: id,
        name: props.name,
        email: props.email,
        mobile: '0000',
      }
      fetchData('/edit/' + id, 'PUT', member).then(data => {
        props.setShow(false);
      });
    } else {
      const member = {
        name: props.name,
        email: props.email,
        mobile: '0000',
      }
      fetchData('/', 'POST', member).then(data => {
        props.setShow(false);
      });
    }
  }

  return (<>
  {props.show &&
  <div className="popup">
    <form className="login-form">
    <h3 className="text">{props.title}</h3>
    <div className="content">
    {props.inputs.length > 0 && props.inputs.map((input, key) =>
      <Input key={key} label={input.label} value={input.name} type={input.type} placeholder={input.placeholder} onChange={(e) => input.setValue(e.target.value)}/>
    )}
    {props.inputs.length > 0 &&<div className='inline'>
        <button className='save' onClick={submitRegister}>save</button>
        <button className='close' onClick={() => props.setShow(false)}>close</button>
      </div>}
    </div>
    </form>
  </div>}
  </>
  );
}
