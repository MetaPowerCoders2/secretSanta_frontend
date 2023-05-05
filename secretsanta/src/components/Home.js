import React from 'react';
import { useState } from 'react';
import './Home.css';

export default function Home(){

  const data = {
    group_name: 'Family',
    members: [
      {
        name: 'sofia',
        email: "example@gmail.com"
      },
      {
        name: 'lucas',
        email: "lucas@gmail.com"
      }
    ]
  };

  const totalGroups = [
    'family', 'friends', 'cohorts'
  ]

  const [groups, setGroups] = useState(data);
  const [groupsCreated, setGroupsCreated] = useState(totalGroups);

  return(
    <div className="grid">
      <div className='lateral_menu'>
        <h1 className="text">Your Secret Santa <i className="fa fa-plus-circle add_group"></i></h1>
      {groupsCreated.length > 0 && <>
        {groupsCreated.map(group =>
        <div className='groups_created'>
        {group}
      </div>)};
      </>}
    </div>
      <div className="display_menu">
        <div className="display_data">
       {Object.keys(groups).length === 0 && <h1 className="text">PLEASE SELECT A SECRET SANTA GROUP OR CREATE A NEW ONE</h1>}
       {Object.keys(groups).length > 0 && <>
       <h1 className="text">{groups.group_name}</h1>
          <table>
            <thead>
              <tr>
                <th className='right_item'>Name</th>
                <th>Email</th>
              </tr>
            </thead>
       {groups.members.map(item =>
          <tbody>
            <tr>
              <td className='right_item'>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          </tbody>  )}
        </table>
        </>
       }
       <div className='icons'>
        <i className='fas fa-edit'></i>
        <i className='fas fa-sync'></i>
        <i className="fa fa-plus-circle"></i>
       </div>
       <div class="regalo-navidad">
          {/* <img src={require('../pictures/present.jpg')}/> */}
      </div>
       </div>
      </div>
    </div>
  )
}
