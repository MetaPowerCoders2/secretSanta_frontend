
import React from "react"

export default function Table(props){

    function openModal(id){
        props.setId(id);
        props.setShow(true);
        props.setTitle("Edit");
    }

    return(
        <table>
            <thead>
              <tr>
                <th className='right_item'>Name</th>
                <th>Email</th>
              </tr>
            </thead>
       {props.members.map(item =>
          <tbody>
            <tr>
              <td className='right_item'>{item.name}</td>
              <td>{item.email}</td>
              <td><i onClick={() => openModal(item.id)} className='fas fa-edit'></i></td>
            </tr>
          </tbody>  )}
        </table>
    )
}
