import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users.users); 

  const [username, setUsername] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const newuser = username.trim();

    if (!newuser) {
      alert("Please enter a name to login.");
      return;
    }

    const existingUser = users.find((u) => u.name === newuser);

    if (!existingUser) {
      alert("User not found.");
      return;
    }

    dispatch(login(existingUser)); 
    navigate(existingUser.role === "admin" ? "/admin" : "/dashboard");
    setUsername("");
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

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
