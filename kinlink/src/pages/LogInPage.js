import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export default function LogInPage() {
  let { loginUser } = useContext(AuthContext);
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    console.log(e);
    try {
      await loginUser(username, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Your username here"
          onChange={(e) => setUsername(e.target.value)}
        ></input></div>
        <div className="input-wrapper">
       <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password here"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        </div>
        <button className="login-btn" type="submit">Log In</button>
      </form>
      {!(loginUser)?<h2 style={{textShadow: '0 2px 2px black', color: 'aliceblue', alignSelf: "center"}}>Please log in ...</h2>:null}
      </div>
      
  );
}
