const localhost = "http://localhost:3000";

export default async function fetchData(route, method, body) {
  let response = {};

  if (!body) {
      response = await fetch(localhost + route, { method: method });
  } else {
      response = await fetch(localhost + route, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
      },
        body: JSON.stringify(body),
      });
  }

  const data = await response.json();
  return data;
}
