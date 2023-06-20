import React, { useState } from 'react';
import Axios from 'axios';

export default function Register() {
  const [userEnameReg, setUserEnameReg] = useState("");
  const [passwordReg, setpasswordReg] = useState("");
  const [nameReg, setnameReg] = useState("");
  const [firstnameReg, setfirstnameReg] = useState("");

  const register = () => {
    Axios.post('http://localhost:3000/register', {
      email: userEnameReg,
      name: nameReg,
      firstname: firstnameReg,
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
      <h1>Registration</h1>
      <h3>Email</h3>
      <input
        type="email"
        onChange={(e) => {
          setUserEnameReg(e.target.value);
        }}
      ></input>
      <h3>Password</h3>
      <input
        type="password"
        onChange={(e) => {
          setpasswordReg(e.target.value);
        }}
      ></input>
      <h3>Name</h3>
      <input
        type="text"
        onChange={(e) => {
          setnameReg(e.target.value);
        }}
      ></input>
      <h3>First Name</h3>
      <input
        type="text"
        onChange={(e) => {
          setfirstnameReg(e.target.value);
        }}
      ></input>
      <button onClick={register}>Enregistrer</button>
    </div>
  );
}

