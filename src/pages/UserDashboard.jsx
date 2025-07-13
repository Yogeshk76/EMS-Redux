import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);
  const user = useSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">My Tasks</h2>
        <ul className="space-y-2">
          {tasks.length === 0 && (
            <p className="text-gray-500">No tasks available.</p>
          )}
          {tasks
            .filter((task) => task.assignedTo === user.id)
            .map((task) => (
              <li key={task.id} className="border p-4 rounded">
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-600">
                  Completed: {task.completed ? "Yes" : "No"}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
