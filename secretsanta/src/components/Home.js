import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import createGroup from "../utils/createGroup";
import submitEditGroup from "../utils/editGroup";
import NewPopUp from "./NewPopUp";
import Table from "./Table";
import Icons from "./Icons";
import fetchData from "../utils/fetchData";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import NewGroupForm from "./NewGroupForm";
import NewEditGroupForm from "./NewEditGroupForm";
import NewEditMemberForm from "./NewEditMemberForm";
import submitEditMember from "../utils/editMember";
import submitAddMember from "../utils/addMember";
import NewAddMemberForm from "./NewAddMemberForm";
import generateEmails from "../utils/generateEmails";
import removeGroup from "../utils/removeGroup";

import { emptyGroup, newMember } from "../utils/defaultValues";

export default function Home() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [showNewGroup, setShowNewGroup] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showEditMember, setShowEditMember] = useState(false);
  const [showGenerateEmails, setShowGenerateEmails] = useState(false);
  const [showEditGroup, setShowEditGroup] = useState(false);
  const [showRemove, setShowRemove] = useState(false);

  const [member, setMember] = useState(newMember);
  const [newGroup, setNewGoup] = useState(emptyGroup);

  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [groups, setGroups] = useState({});
  const [groupsCreated, setGroupsCreated] = useState([]);

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
      if (!showNewGroup) {
        setNewGoup(emptyGroup);
      } else if (!showAddMember | !setShowEditMember) {
        setMember(newMember);
      }
    } catch (e) {
      console.log(e);
    }
  }, [
    showNewGroup,
    showAddMember,
    showEditMember,
    showGenerateEmails,
    showEditGroup,
    showRemove,
  ]);

  async function displayGroupInfo(id) {
    try {
      let selectedGroup = groupsCreated.filter((x) => x.id === id);
      setGroups(selectedGroup[0]);
    } catch (e) {
      console.log(e);
    }
  }

  async function sendEmails() {
    setShowGenerateEmails(true);
    generateEmails(groups).then(() => {
      setShowGenerateEmails(false);
    });
  }

  return (
    <>
      <NewPopUp
        show={showGenerateEmails}
        setShow={setShowGenerateEmails}
        title="Thank you! You sent the emails with the Secret Santa!"
      ></NewPopUp>
      <NewPopUp
        show={showRemove}
        setShow={setShowRemove}
        title="Are you sure you want to remove it?"
        primary_button={{
          label: "Remove",
          on_clicked: () =>
            removeGroup(groups.id).then(() => {
              setGroups({});
              setShowRemove(false);
            }),
        }}
      ></NewPopUp>
      <NewPopUp
        show={showNewGroup}
        setShow={setShowNewGroup}
        title="Add new Group"
        primary_button={{
          label: "Save",
          on_clicked: () =>
            createGroup(newGroup).then(() => setShowNewGroup(false)),
        }}
      >
        <NewGroupForm setGroup={setNewGoup} />
      </NewPopUp>
      <NewPopUp
        show={showEditGroup}
        setShow={setShowEditGroup}
        title="Edit group"
        primary_button={{
          label: "Edit",
          on_clicked: () =>
            submitEditGroup(groups).then(() => setShowEditGroup(false)),
        }}
      >
        <NewEditGroupForm group={groups} setGroup={setGroups} />
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
          showNewGroup |
          showAddMember |
          showEditMember |
          showGenerateEmails |
          showEditGroup |
          showRemove
            ? "background-modal"
            : null
        }`}
      >
        <div className="grid">
          <div className="lateral_menu">
            <h1 className="text">
              Your Secret Santa{" "}
              <i
                className="fa fa-plus-circle add_group"
                onClick={() => setShowNewGroup(true)}
              ></i>
            </h1>
            {groupsCreated.length > 0 && (
              <>
                {groupsCreated.map((group_item, index) => (
                  <div
                    key={index}
                    className="groups_created cursor_pointer"
                    onClick={() => displayGroupInfo(group_item.id)}
                  >
                    {group_item.name}{" "}
                    <i
                      className="fa fa-trash rigth"
                      onClick={() => setShowRemove(true)}
                    ></i>
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
                  <h1 className="text">
                    {groups.name}{" "}
                    <i
                      className="fas fa-edit"
                      onClick={() => setShowEditGroup(true)}
                    ></i>
                  </h1>

                  <h3>
                    <b>Max Budget:</b> £{groups.maxPrice}
                  </h3>
                  <h3>
                    <b>Date:</b> {groups.date}
                  </h3>
                  <h3>
                    <b>Location:</b> {groups.location}
                  </h3>
                  <Table
                    members={groups.members}
                    setShow={setShowEditMember}
                    setMember={setMember}
                  />
                  <Icons
                    generateEmails={sendEmails}
                    setShowAddMember={setShowAddMember}
                  />
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
