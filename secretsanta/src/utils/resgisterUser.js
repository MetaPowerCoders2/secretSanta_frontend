import fetchData from "./fetchData";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


async function registerUser(userObj) {
  try {
    return await fetchData("/register", "POST", userObj);
  } catch (e) {
    console.log(e);
  }
}

async function signIn(userObj) {
  try {
    let userInfo = await fetchData("/signin", "POST", userObj);
    cookies.set('userId', userInfo.id);
    cookies.set('token', userInfo.token);
    return userInfo;
  } catch (e) {
    console.log(e);
  }
}

async function signOut(userObj){
  try {
    if(cookies.get('token')){
      cookies.remove('userId');
      cookies.remove('token');
      await fetchData("/signout", "POST", userObj);
    }
  } catch (e) {
    console.log(e);
  }
}

export {signIn, registerUser, signOut}
