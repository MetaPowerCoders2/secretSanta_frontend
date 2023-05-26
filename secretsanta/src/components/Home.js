import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import submitRegister from "../utils/createGroup";
import NewPopUp from "./NewPopUp";
import Table from "./Table";
import Icons from "./Icons";
import fetchData from "../utils/fetchData";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import NewGroupForm from "./NewGroupForm";
import NewEditMemberForm from "./NewEditMemberForm";
import submitEditMember from "../utils/editMember";
import submitAddMember from "../utils/addMember";
import NewAddMemberForm from "./NewAddMemberForm";

export default function Home() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [showNewGroup, setShowNewGroup] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showEditMember, setShowEditMember] = useState(false);

  const [member, setMember] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [group, setGroup] = useState(null);
  const [data, setData] = useState([]);
  const [groups, setGroups] = useState({});
  const [groupsCreated, setGroupsCreated] = useState([]);
  const [groupName, setGroupName] = useState();

  useEffect(() => {
    try {
      const user = cookies.get("user");
      if (!user) {
        navigate("/");
      }
      setUser(user);
      fetchData("user/me", "GET", null, user.token).then((result) => {
        if (result.message.groups) {
          setData(result.message);
          setGroupsCreated(result.message.groups);
        }
      });

      if (!showNewGroup || !showAddMember || !showEditMember) {
        setMember({
          name: "",
          email: "",
          mobile: "",
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [showNewGroup, showAddMember, showEditMember]);

  async function displayGroupInfo(id) {
    try {
      let selectedGroup = groupsCreated.filter((x) => x.id === id);
      setGroups(selectedGroup[0]);
    } catch (e) {
      console.log(e);
    }
  }

  function addGroup() {
    setShowAddMember(true);
  }

  return (
    <>
      <NewPopUp
        show={showNewGroup}
        setShow={setShowNewGroup}
        title="Add new group"
        primary_button={{
          label: "Save",
          on_clicked: () =>
            submitRegister(groupName).then(() => setShowNewGroup(false)),
        }}
      >
        <NewGroupForm setGroupName={setGroupName} />
      </NewPopUp>
      <NewPopUp
        show={showAddMember}
        setShow={setShowAddMember}
        title="Add New Member"
        primary_button={{
          label: "Add",
          on_clicked: () =>
            submitAddMember(member, groups).then(() => setShowAddMember(false)),
        }}
      >
      <NewAddMemberForm setMember={setMember} />
      </NewPopUp>
      <NewPopUp
        show={showEditMember}
        setShow={setShowEditMember}
        title="Edit Member"
        primary_button={{
          label: "Edit",
          on_clicked: () =>
            submitEditMember(member, groups).then(() =>
              setShowEditMember(false)
            ),
        }}
      >
        <NewEditMemberForm member={member} setMember={setMember} />
      </NewPopUp>
      <div
        className={`${
          showNewGroup || showAddMember || showEditMember
            ? "background-modal"
            : null
        }`}
      >
        <div className="grid">
          <div className="lateral_menu">
            <h1 className="text">
              Your Secret Santa{" "}
              <i className="fa fa-plus-circle add_group" onClick={addGroup}></i>
            </h1>
            {groupsCreated.length > 0 && (
              <>
                {groupsCreated.map((group_item) => (
                  <div
                    key={group_item.id}
                    className="groups_created cursor_pointer"
                    onClick={() => displayGroupInfo(group_item.id)}
                  >
                    {group_item.name}
                  </div>
                ))}
                ;
              </>
            )}
          </div>
          <div className="display_menu">
            <div className="display_data">
              {Object.keys(groups).length <= 0 && (
                <h1 className="text">
                  PLEASE SELECT A SECRET SANTA GROUP OR CREATE A NEW ONE
                </h1>
              )}
              {Object.keys(groups).length > 0 && (
                <>
                  <h1 className="text">{groups.name}</h1>

                  <h3>
                    <b>Max Budget:</b> £{groups.maxPrice}
                  </h3>
                  <h3>
                    <b>Date:</b> {groups.date}
                  </h3>
                  <Table
                    members={groups.members}
                    setShow={setShowEditMember}
                    setMember={setMember}
                  />
                  <Icons setShowAddMember={setShowAddMember} />
                </>
              )}
              <div className="regalo-navidad">
                {/* <img src={require('../pictures/present.jpg')}/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
