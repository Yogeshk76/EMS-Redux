import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
  const cleanName = username.trim();

  if (!cleanName) {
    alert("Please enter a name to login.");
    return;
  }

  dispatch(login({ name: cleanName }));
  navigate('/dashboard');
};

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Login Page</h1>
        <input 
        className="border px-4 py-2 rounded mr-2"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
