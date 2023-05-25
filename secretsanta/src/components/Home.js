import React from 'react';
import { useState, useEffect } from 'react';
import './Home.css';
import Popup from './Popup';
import Table from './Table';
import Icons from './Icons';
import fetchData from "../utils/fetchData";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";


export default function Home(){

  const cookies = new Cookies();
  const navigate = useNavigate();

  // const data = {
  //   group_name: 'Family',
  //   members: [
  //     {
  //       name: 'sofia',
  //       email: "example@gmail.com"
  //     },
  //     {
  //       name: 'lucas',
  //       email: "lucas@gmail.com"
  //     }
  //   ]
  // };

  // const totalGroups = [
  //   {
  //     id: 1,
  //     name: "family"
  //   },
  //   {
  //     id: 2,
  //     name: 'friends'
  //   },
  //   {
  //     id: 3,
  //     name: 'colleagues'
  //   }
  // ];

  const popupInputs = [
    {
    label: 'Name',
    name: 'Name',
    type: 'text',
    placeholder: 'Add your name here',
    setValue: () => setEmail()
  },
  {
    label: 'Email',
    name: 'Email',
    type: 'email',
    placeholder: 'Add your eamil here',
    setValue:() => setName()
  },
];

  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [group, setGroup] = useState(null);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [groups, setGroups] = useState([]);
  const [groupsCreated, setGroupsCreated] = useState([]);
  const [inputs, setInputs] = useState(popupInputs);

  useEffect(() => {
    try{
      const user = cookies.get('user');
      if(!user){
        navigate("/");
      }
      setUser(user);
      console.log(user.token);
      fetchData('user/me', 'GET', null, user.token).then(data => {
        setGroups(data);
      });

      if(!show){
        setInputs(popupInputs)
        setId(null);
        setName(null);
        setEmail(null);
        setGroup(null);
      }
    }catch(e){
      console.log(e);
    }
  }, [show])

  async function displayGroupInfo(id){
    try{
      let data = await fetchData('user/me', 'GET', null, user.token);
      console.log(data);
      setGroupsCreated(data);
    }catch(e){
      console.log(e);
    }
  }

  function addGroup(){
    setTitle("Add new group");
    setInputs([
      {
        label: 'Name',
        name: 'Name',
        type: 'text',
        placeholder: 'Add your group name here',
        setValue: () => saveNewGroup(group)
      }
    ])
    setShow(true);
  }

  async function saveNewGroup(group){
    try{
      await fetchData('group', 'POST', group);
      setShow(false);
    } catch(e){
      console.log(e);
    }
  }

  return(
    <>
    <Popup
      show={show}
      setShow={setShow}
      id={id}
      title={title}
      inputs={inputs}
      name={name}
      email={email}
    />
    <div className={`${show ? 'background-modal' : null}`}>
    <div className="grid">
      <div className='lateral_menu'>
        <h1 className="text">Your Secret Santa <i className="fa fa-plus-circle add_group" onClick={addGroup}></i></h1>
      {groupsCreated.length > 0 && <>
        {groupsCreated.map(group_item =>
        <div
          key={group_item.id}
          className='groups_created cursor_pointer'
          onClick={() => displayGroupInfo(group.id)}>
        {group_item.name}
      </div>)};
      </>}
    </div>
      <div className="display_menu">
        <div className="display_data">
       {groups.length <= 0 &&
        <h1 className="text">PLEASE SELECT A SECRET SANTA GROUP OR CREATE A NEW ONE</h1>
       }
       {groups.length > 0 && <>
        <h1 className="text">{groups.group_name}</h1>
          <Table
            members={groups.members}
            setShow={setShow}
            setId={setId}
            setTitle={setTitle}
          />
      <Icons
        groups={groups}
        setShow={setShow}
        setId={setId}
        setTitle={setTitle}
        setInputs={setInputs}
        setEmail={setEmail}
        setName={setName}
       />
       </>
       }
       <div className="regalo-navidad">
          {/* <img src={require('../pictures/present.jpg')}/> */}
      </div>
       </div>
      </div>
    </div>
    </div>
    </>
  )
}
