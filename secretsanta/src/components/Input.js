import './Input.css';

export default function Input(props){
    return(
        <div>
            <label className="label">{props.label}</label>
            <input className="input" type={props.type} placeholder={props.placeholder} ></input>
        </div>
    )
}
