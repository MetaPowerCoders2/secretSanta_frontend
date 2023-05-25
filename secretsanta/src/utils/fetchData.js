const localhost = "http://localhost:3000/api/";

export default async function fetchData(route, method, body, token = null) {
  let response = {};

  if (!body) {
      response = await fetch(localhost + route, { method: method });
  } else {
      console.log(token)
      response = await fetch(localhost + route, {
        method: method,
        headers: {
          'Content-Type': "application/json",
          'Access-Control-Allow-Origin': "*",
          Credentials: 'same-origin',
      },
        body: JSON.stringify(body),
      });
  }

  const data = await response.json();
  return data;
}
