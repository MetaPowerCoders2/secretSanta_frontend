import "./Popup.css";
import Input from "./Input";

export default function NewGroupForm(props) {
  return (
    <form className="login-form">
      <div className="content">
        <Input
          label="Group name"
          type="text"
          placeholder="Type a group name"
          onChange={(e) => props.setGroupName(e.target.value)}
        />
      </div>
    </form>
  );
}
