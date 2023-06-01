import "./Popup.css";
import Input from "./Input";

export default function NewAddMemberForm(props) {
  return (
    <form className="login-form">
      <div className="content">
        <Input
          label="Member name"
          type="text"
          name="name"
          placeholder="Type your Member name"
          onChange={(e) =>
            props.setMember(() => ({
              name: e.target.value,
            }))
          }
        />
        <Input
          label="Member email"
          name="eamil"
          type="text"
          placeholder="Type your Member email"
          onChange={(e) =>
            props.setMember(() => ({
              email: e.target.value,
            }))
          }
        />
      </div>
    </form>
  );
}
