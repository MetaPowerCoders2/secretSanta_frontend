import Cookies from "universal-cookie";
import fetchData from "../utils/fetchData";

export default async function submitEditMember(groupName) {
  const cookies = new Cookies();
  const user = cookies.get("user");

  const member = {
    name: groupName,
    maxPrice: "00",
    members: [
      {
        name: user.name,
        email: user.email,
        mobile: "1254",
      },
    ],
    location: "",
    date: new Date(),
  };
  return await fetchData("group", "POST", member, user.token);
}
