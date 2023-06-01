import Cookies from "universal-cookie";
import fetchData from "../utils/fetchData";

export default async function submitAddMember(group) {
  const cookies = new Cookies();
  const user = cookies.get("user");

  return await fetchData(
    "group/" + group.id + "/send",
    "GET",
    group.members,
    user.token
  );
}
