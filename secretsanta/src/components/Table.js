import React from "react";

export default function Table(props) {
  function openModal(member) {
    props.setMember(member);
    props.setShow(true);
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
        props.members.map((item) => (
          <tbody key={item.id}>
            <tr key={item.id}>
              <td key={item.id} className="right_item">
                {item.name}
              </td>
              <td key={item.id}>{item.email}</td>
              <td key={item.id}>
                <i
                  key={item.id}
                  onClick={() => openModal(item)}
                  className="fas fa-edit"
                ></i>
              </td>
            </tr>
          </tbody>
        ))}
    </table>
  );
}
