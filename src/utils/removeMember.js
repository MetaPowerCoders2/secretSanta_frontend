import Cookies from "universal-cookie";
import fetchData from "../utils/fetchData";

export default async function removeMember(member, group) {
  const cookies = new Cookies();
  const user = cookies.get("user");

  group.members = group.members.filter((item) => item.id !== member.id);

  return await fetchData("group/" + group.id, "PUT", group, user.token);
}
