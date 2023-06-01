import React from "react";

export default function Table(props) {
  function openModal(member) {
    props.setMember(member);
    props.setShow(true);
  }

  function removeMember(member){
    props.setMember(member);
    props.setShowRemove(true)
  }

  return (
    <table>
      <thead>
        <tr>
          <th className="right_item">Name</th>
          <th>Email</th>
        </tr>
      </thead>
      {props.members &&
        props.members.map((item, index) => (
          <tbody key={index}>
            <tr key={item.id}>
              <td className="right_item">{item.name}</td>
              <td>{item.email}</td>
              <td>
                <i onClick={() => openModal(item)} className="fa fa-edit"></i>
              </td>
              <td>
                <i className="fa fa-trash rigth" onClick={() => removeMember(item)}></i>
              </td>
            </tr>
          </tbody>
        ))}
    </table>
  );
}
