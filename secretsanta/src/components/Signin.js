import React from 'react';
import './Signin.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {registerUser, signIn} from "../utils/resgisterUser";

export default function Signin(){
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState(null);
  const [password, setPassword] = useState();

  const [isLogin, setIslogin] = useState(true);

  useEffect(() => {
    if(location.pathname === '/register'){
      setIslogin(false);
    } else {
      setIslogin(true);
    }
  })

  async function submitRegister(event) {
    event.preventDefault()
    try {
      if(location.pathname === '/register'){
        const newUser = {
          password: password,
          email:email,
          name: name,
          phone: phone
        }
        let result = await registerUser(newUser);
        if(result.message){
          setError(result.message)
        } else {
          setError(null);
          navigate("/");
        }
      } else {
        const newUser = {
          password: password,
          email:email,
        }
        let result = await signIn(newUser);
        if(result.message){
          setError(result.message)
        } else {
          setError(null);
          navigate("/home");
        }
        setEmail(null);
        setPassword(null);
      }

    } catch (error) {
      setError("Something happen! please try again!");
    }
  }

  function redirectSignIn(){
    setIslogin(false)
    navigate("/");
  }

  function redirectRegister(){
    setIslogin(true)
    navigate("/register");
  }

  return(
    <>
  <div className="login-page">
  <div className="form">
    <form className="login-form" onSubmit={submitRegister}>
      {!isLogin && <>
            <input onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
      </>}
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br></br>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Password" /><br></br>
      <button>{isLogin ? "login" : "signIn"}</button>
      {isLogin && <p className="message">Not registered? <button onClick={() => redirectRegister()}>Create an account</button></p>}
      {!isLogin && <p className="message">Already registered? <button onClick={() => redirectSignIn()}>Login now</button></p>}
    </form>
  </div>
</div>
</>
  )
}
