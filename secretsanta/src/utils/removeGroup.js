import Cookies from "universal-cookie";
import fetchData from "../utils/fetchData";

export default async function remove(group_id) {
  const cookies = new Cookies();
  const user = cookies.get("user");

  return await fetchData("group/" + group_id, "DELETE", null, user.token);
}
