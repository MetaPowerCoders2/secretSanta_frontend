import React from 'react';
import { useState, useEffect } from 'react';
import './Home.css';
import Popup from './Popup';
import Table from './Table';
import Icons from './Icons';
import fetchData from "../utils/fetchData";

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
    'family', 'friends', 'colleagues'
  ]
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [groups, setGroups] = useState(data);
  const [groupsCreated, setGroupsCreated] = useState(totalGroups);
  const [displayInputs, setDisplayInputs] = useState(true)

  useEffect(() => {
    try{
      fetchData('/', 'GET', null).then(data => {
        setGroups(data);
      });
    }catch(e){
      console.log(e);
    }
  })

  async function displayGroupInfo(id){
    try{
      let data = await fetchData('/' + id, 'GET', null);
      setGroupsCreated(data);
    }catch(e){
      console.log(e);
    }
  }

  return(
    <>
    <Popup show={show} setShow={setShow} id={id} title={title} displayInputs={displayInputs}/>
    <div className={`${show ? 'background-modal' : null}`}>
    <div className="grid">
      <div className='lateral_menu'>
        <h1 className="text">Your Secret Santa <i className="fa fa-plus-circle add_group"></i></h1>
      {groupsCreated.length > 0 && <>
        {groupsCreated.map(group =>
        <div className='groups_created cursor_pointer' onClick={() => displayGroupInfo(group.id)}>
        {group}
      </div>)};
      </>}
    </div>
      <div className="display_menu">
        <div className="display_data">
       {Object.keys(groups).length === 0 &&
        <h1 className="text">PLEASE SELECT A SECRET SANTA GROUP OR CREATE A NEW ONE</h1>
       }
       {Object.keys(groups).length > 0 && <>
        <h1 className="text">{groups.group_name}</h1>
          <Table
            members={groups.members}
            setShow={setShow}
            setId={setId}
            setTitle={setTitle}
          />
        </>
       }
      <Icons
        setShow={setShow}
        setId={setId}
        setTitle={setTitle}
        setDisplayInputs={setDisplayInputs}
                  />
       <div class="regalo-navidad">
          {/* <img src={require('../pictures/present.jpg')}/> */}
      </div>
       </div>
      </div>
    </div>
    </div>
    </>
  )
}
