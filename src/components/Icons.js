export default function Icons(props) {
  return (
    <div className="icons">
      <i className="fa fa-refresh" onClick={() => props.generateEmails()}></i>
      <i
        className="fa fa-plus-circle"
        onClick={() => props.setShowAddMember(true)}
      ></i>
    </div>
  );
}
