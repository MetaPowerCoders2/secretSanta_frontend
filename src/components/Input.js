import "./Input.css";

export default function Input(props) {
  return (
    <div>
      <label className="label">{props.label}</label>
      <input
        value={props.value}
        className="input"
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
      ></input>
    </div>
  );
}
