import "./Popup.css";
import Input from "./Input";

export default function NewEditMemberForm(props) {
  return (
    <form className="login-form">
      <div className="content">
        <Input
          label="Member name"
          type="text"
          name="name"
          value={props.member.name}
          placeholder="Type your Member name"
          onChange={(e) =>
            props.setMember((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
        <Input
          label="Member email"
          name="eamil"
          type="text"
          value={props.member.email}
          placeholder="Type your Member email"
          onChange={(e) =>
            props.setMember((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
        />
      </div>
    </form>
  );
}
