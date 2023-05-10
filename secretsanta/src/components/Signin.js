import React from 'react';
import Snowfall from 'react-snowfall';
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
    <Snowfall />
    <form className="login-form" onSubmit={submitRegister}>
    <h1 className='merry-xmas'>SECRET SANTA</h1>
      {!isLogin && <>
        <input className="input" onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input className="input" onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
      </>}
      <input className="input" onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br></br>
      <input className="input" onChange={(e) => setEmail(e.target.value)} placeholder="Password" /><br></br>
      <button className='button'>{isLogin ? "login" : "signIn"}</button>
      {isLogin && <p className="message">Not registered? <button className='button-text' onClick={() => redirectRegister()}>Create an account</button></p>}
      {!isLogin && <p className="message">Already registered? <button className='button-text' onClick={() => redirectSignIn()}>Login now</button></p>}
    </form>
  </div>
      <div class="bottom"></div>
        <div class="greengift">
            <div class="tape1">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
                <div class="line4"></div>
            </div>
            <div class="tape2">
                <div class="line5"></div>
                <div class="line6"></div>
                <div class="line7"></div>
            </div>
            <div class="cover"></div>
            <div class="tape3"></div>
        </div>
        <div class="stripedgift">
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
        </div>
        <div class="dottedgift"></div>
        <div class="redgift">
            <div class="tape4"></div>
            <div class="line10"></div>
            <div class="tape5">
                <div class="line11"></div>
                <div class="line12"></div>
            </div>
            <div class="circle5"></div>
            <div class="circle6"></div>
            <div class="circle7"></div>
        </div>
        <div class="ball">
            <div class="smolball1"></div>
            <div class="smolball2"></div>
            <div class="smolball3"></div>
            <div class="dot"></div>
            <div class="topv">.</div>
            <div class="toph"></div>
        </div>
        <div class="de1"></div>
        <div class="de2"></div>
</div>
</>
  )
}
