import "./Popup.css";
import Input from "./Input";

export default function EditGroupForm(props) {
  return (
    <form className="login-form">
      <div className="content">
        <Input
          label="Group name"
          type="text"
          value={props.group.name}
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
          value={props.group.maxPrice}
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
          value={props.group.location}
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
          value={props.group.date}
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
