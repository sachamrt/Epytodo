import React, { useState } from 'react';
import './connection.css';
import Axios from "axios";
import Register from "../register";

export default function Connection() {
  const [userEnameReg, setUserEnameReg] = useState("");
  const [passwordReg, setpasswordReg] = useState("");

  const login = () => {
    Axios.post('http://localhost:3000/login', {
      email: userEnameReg,
      password: passwordReg,
    }).then((response) => {
        const token = response.headers.authorization;
        localStorage.setItem('token', token);
        localStorage.setItem('id', userEnameReg);
        window.location.href = '../home/index.html';
      })
      .catch((error) => {
        console.log(error)
      });

  };

  return (
    <div>
      <div className='form'>
        <form action="" method="post">
          <div id="connection">
            <label htmlFor=''>Email</label>
            <input
              type='email'
              onChange={(e) => {
                setUserEnameReg(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor=''>Mot de passe</label>
            <input
              type='password'
              onChange={(e) => {
                setpasswordReg(e.target.value);
              }}
            ></input>
          </div>
          <button onClick={login}>Connection</button>
        </form>
        <div><Register /></div>
      </div>
    </div>
  );
}
