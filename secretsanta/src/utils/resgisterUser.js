import fetchData from "./fetchData";
import Cookies from "universal-cookie";

const cookies = new Cookies();

async function registerUser(userObj) {
  try {
    return await fetchData("login/register", "POST", userObj);
  } catch (e) {
    console.log(e);
  }
}

async function signIn(userObj) {
  try {
    let userInfo = await fetchData("login/signin", "POST", userObj);
    cookies.set("user", userInfo);
    cookies.set("token", userInfo.token);
    return userInfo;
  } catch (e) {
    console.log(e);
  }
}

async function signOut(userObj) {
  try {
    if (cookies.get("token")) {
      cookies.remove("user");
      cookies.remove("token");
      await fetchData("login/signout", "POST", userObj);
    }
  } catch (e) {
    console.log(e);
  }
}

export { signIn, registerUser, signOut };
