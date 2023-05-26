import Cookies from "universal-cookie";
import fetchData from "../utils/fetchData";

export default async function createGroup(group) {
  const cookies = new Cookies();
  const user = cookies.get("user");

  group.members = [];

  group.members.push({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  return await fetchData("group", "POST", group, user.token);
}
