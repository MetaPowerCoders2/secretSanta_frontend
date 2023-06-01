import Cookies from "universal-cookie";
import fetchData from "../utils/fetchData";

export default async function submitEditGroup(group) {
  const cookies = new Cookies();
  const user = cookies.get("user");

  return await fetchData("group/" + group.id, "PUT", group, user.token);
}
