import Cookies from "universal-cookie";
import fetchData from "../utils/fetchData";

export default async function submitAddMember(member, group) {
  const cookies = new Cookies();
  const user = cookies.get("user");

  group.members.push(member);
  console.log(group);
  return await fetchData("group/" + group.id, "PUT", group, user.token);
}
