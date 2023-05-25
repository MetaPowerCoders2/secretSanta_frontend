import axios from "axios";
const localhost = "http://localhost:3005/api/";

export default async function fetchData(route, method, body, token) {
  const data = await axios({
    method: method,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      mode: "cors",
    },
    withCredentials: !token ? false : true,
    url: localhost + route,
    data: body
  });

  return data.data;
}
