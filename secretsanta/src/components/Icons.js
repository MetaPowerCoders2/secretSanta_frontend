export default function Icons(props) {
  return (
    <div className="icons">
      <i
        className="fas fa-sync"
        onClick={() => props.setShowAddMember(true)}
      ></i>
      <i
        className="fa fa-plus-circle"
        onClick={() => props.setShowAddMember(true)}
      ></i>
    </div>
  );
}
