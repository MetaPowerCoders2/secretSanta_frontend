import React from "react";
import Snowfall from "react-snowfall";
import "./Signin.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser, signIn } from "../utils/resgisterUser";

export default function Signin() {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState(null);
  const [password, setPassword] = useState();

  const [isLogin, setIslogin] = useState(true);

  useEffect(() => {
    if (location.pathname === "/register") {
      setIslogin(false);
    } else {
      setIslogin(true);
    }
  });

  async function submitRegister(event) {
    event.preventDefault();
    try {
      if (location.pathname === "/register") {
        const newUser = {
          password: password,
          email: email,
          name: name,
          mobile: phone,
        };
        let result = await registerUser(newUser);
        if (
          result.message &&
          result.message !== "User registered successfully! Please signin now!"
        ) {
          setError(result.message);
          showModal();
        } else {
          setError(null);
          setPassword(null);
          navigate("/");
        }
      } else {
        const newUser = {
          email: email,
          password: password,
        };
        let result = await signIn(newUser);
        console.log(result);
        if (
          result.message &&
          result.message !== "User registered successfully! Please signin now!"
        ) {
          setError(result.message);
          showModal();
        } else {
          setError(null);
          setEmail(null);
          setPassword(null);
          navigate("/home");
        }
      }
    } catch (error) {
      setError("Something happen! please try again!");
      showModal();
    }
  }

  function showModal() {
    setShow(true);
    setTimeout(() => {
      setShow(false);
      setError(null);
    }, 2000);
  }

  function redirectSignIn(e) {
    e.preventDefault();
    setIslogin(false);
    navigate("/");
  }

  function redirectRegister(e) {
    e.preventDefault();
    setIslogin(true);
    navigate("/register");
  }

  return (
    <>
      <div className="login-page">
        <div className="form">
          <Snowfall />
          <form className="login-form" onSubmit={submitRegister}>
            <h1 className="merry-xmas">SECRET SANTA</h1>
            {!isLogin && (
              <>
                <input
                  className="input"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <input
                  className="input"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                />
              </>
            )}
            <input
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <br></br>
            <input
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <br></br>
            <button className="button">{isLogin ? "login" : "signIn"}</button>
            {isLogin && (
              <p className="message">
                Not registered?{" "}
                <button
                  className="button-text"
                  onClick={(e) => redirectRegister(e)}
                >
                  Create an account
                </button>
              </p>
            )}
            {!isLogin && (
              <p className="message">
                Already registered?{" "}
                <button
                  className="button-text"
                  onClick={(e) => redirectSignIn(e)}
                >
                  Login now
                </button>
              </p>
            )}
          </form>
        </div>
        <div className="bottom"></div>
        <div className="greengift">
          <div className="tape1">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
            <div className="line4"></div>
          </div>
          <div className="tape2">
            <div className="line5"></div>
            <div className="line6"></div>
            <div className="line7"></div>
          </div>
          <div className="cover"></div>
          <div className="tape3"></div>
        </div>
        <div className="stripedgift">
          <div className="circle2"></div>
          <div className="circle3"></div>
          <div className="circle4"></div>
        </div>
        <div className="dottedgift"></div>
        <div className="redgift">
          <div className="tape4"></div>
          <div className="line10"></div>
          <div className="tape5">
            <div className="line11"></div>
            <div className="line12"></div>
          </div>
          <div className="circle5"></div>
          <div className="circle6"></div>
          <div className="circle7"></div>
        </div>
        <div className="ball">
          <div className="smolball1"></div>
          <div className="smolball2"></div>
          <div className="smolball3"></div>
          <div className="dot"></div>
          <div className="topv">.</div>
          <div className="toph"></div>
        </div>
        <div className="de1"></div>
        <div className="de2"></div>
      </div>
    </>
  );
}
