import axios from "axios";
const localhost = "http://localhost:3000/api/";

// axios.defaults.withCredentials = true;

export default async function fetchData(route, method, body, token) {
  console.log(token);
  if (!body) {
    const data =  await axios({
      method: method,
              headers: {
              Authorization: `Bearer ${token}`,
          },
      url: localhost + route ,
    });
    return data.data;
  } else {
const data = await axios({
  method: method,
          headers: {
          "Authorization" : `Bearer ${token}`
      },
  url: localhost + route,
  data: body,
});
return data.data;

}
}
