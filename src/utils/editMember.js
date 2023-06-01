import Cookies from "universal-cookie";
import fetchData from "../utils/fetchData";

export default async function submitEditMember(member, group) {
  const cookies = new Cookies();
  const user = cookies.get("user");

  group.members = group.members.map((item) => {
    if (item.id === member.id) {
      return member;
    } else {
      return item;
    }
  });

  console.log(group);
  return await fetchData("group/" + group.id, "PUT", group, user.token);
}
