import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
//   const [error, setError] = useState(null);

  const navigate = useNavigate();


const handleLogin = async (e) => {
    e.preventDefault();
    console.log(name);
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name, password }),
      });

      console.log("get login");
      if (response.ok) {
        const user = await response.json()
        localStorage.setItem("user", JSON.stringify(user))
        setName("");
        setPassword("");
        navigate("/");
        // response.json().then((response) => {
        //   navigate('/')
        // })
        console.log("get -- login");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };


  return (
    <div className="login">
      <h1>Login</h1>
      
      <input
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="username"
        placeholder="youremail@gmail.com"
        id="email"
        name="email"
      />
      <input
        className="inputBox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="*********"
        id="password"
        name="password"
      />
      <button onClick={handleLogin} className="appButton" type="button">
        Loog In
      </button>
    </div>
  );
};

export default Login;
