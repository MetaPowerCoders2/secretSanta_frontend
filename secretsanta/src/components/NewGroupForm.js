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
          onChange={(e) =>
            props.setGroup((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
        />
        <Input
          label="Group Dudget"
          type="number"
          placeholder="Enter your Maximun budget"
          onChange={(e) =>
            props.setGroup((prevState) => ({
              ...prevState,
              maxPrice: e.target.value,
            }))
          }
        />
        <Input
          label="Group location"
          type="text"
          placeholder="Enter the location"
          onChange={(e) =>
            props.setGroup((prevState) => ({
              ...prevState,
              location: e.target.value,
            }))
          }
        />
        <Input
          label="Group Date"
          type="date"
          placeholder="Enter the date"
          onChange={(e) =>
            props.setGroup((prevState) => ({
              ...prevState,
              date: e.target.value,
            }))
          }
        />
      </div>
    </form>
  );
}
