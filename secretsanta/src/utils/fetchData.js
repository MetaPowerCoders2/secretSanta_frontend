import axios from "axios";
const localhost = "https://secretsantabackend-production.up.railway.app/api/";

export default async function fetchData(route, method, body, token) {
  if (body) {
    const data = await axios({
      method: method,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        mode: "cors",
      },
      withCredentials: !token ? false : true,
      url: localhost + route,
      data: body,
    });

    return data.data;
  } else {
    const data = await axios({
      method: method,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        mode: "cors",
      },
      withCredentials: !token ? false : true,
      url: localhost + route,
    });

    return data.data;
  }
}
