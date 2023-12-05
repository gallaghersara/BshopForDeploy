import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);


  const handleSignUp = () => {
    setError(null);
    setIsLoading(true);

    fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,name,  password }),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          // Signup successful
          console.log('User signed up successfully!');
          response.json ().then((userData) => {
            localStorage.setItem("user", JSON.stringify(userData))
            navigate('/')
          })
        } else {
          // Signup failed
          setError('Signup failed. Please try again.');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError('An error occurred. Please try again.');
      });
  };
  return (
    <div className="register">
      <h2>Register</h2>
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="appButton" type="button" onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
