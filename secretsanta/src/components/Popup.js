import './Popup.css';

export default function Popup(props) {

  return (<>
  {props.show && <div className="popup" style={{ overlay: { background: "#FFFF00" } }}>
    <header>
      <span>{props.title}</span>
    </header>
    <div className="content">
      <div className="field">
        <button>Copy</button>
      </div>
    </div>
  </div>}
  </>
  );
}
