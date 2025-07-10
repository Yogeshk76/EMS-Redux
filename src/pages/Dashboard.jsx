import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../features/auth/authSlice';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, <span className="font-semibold">{user?.name}</span></p>
      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard
