import "./Popup.css";

export default function NewPopUp(props) {
  return (
    <>
      {props.show && (
        <div className="popup">
          <h3 className="text">{props.title}</h3>
          <div className="content">{props.children}</div>
          <div className="inline">
            {props.primary_button && (
              <button
                className="save"
                onClick={props.primary_button.on_clicked}
              >
                {props.primary_button.label}
              </button>
            )}
            <button className="close" onClick={() => props.setShow(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
