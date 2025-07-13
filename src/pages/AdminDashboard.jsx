import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { addTask } from "../features/tasks/taskSlice";
import { deleteTask } from "../features/tasks/taskSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks);
  const users = useSelector((state) => state.users.users);

  const [title, setTitle] = useState("");
  const [assignedUser, setAssignedUser] = useState("");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const taskDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const taskAdd = () => {
    if (!title || !assignedUser) {
      alert("Please fill in all fields.");
      return;
    }

    dispatch(addTask(title, assignedUser));
    setTitle("");
    setAssignedUser("");
  }

  return (
    <div className="p-6 space-y-6">
      {/* 1. Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome, Admin</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      {/* 2. Task Form */}
      <div className="border p-4 rounded bg-gray-100 space-y-4">
        <h2 className="text-xl font-semibold">Create New Task</h2>
        <input
          className="border px-4 py-2 rounded w-full"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <select className="border px-4 py-2 rounded w-full" value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)}>
          <option value="">-- Select a user --</option>
          {users
          .filter((user) => user.role !== "admin")
          .map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={taskAdd} disabled={!title || !assignedUser} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>

      {/* 3. Task List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">All Tasks</h2>
        <ul className="space-y-2" >
          {/* Example task item */}
          {tasks.length === 0 && (
            <p className="text-gray-500">No tasks available.</p>
          )}
          {tasks.map((task) => (
            <li key={task.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-600">Assigned to: {task.assignedTo}</p>
              <p className="text-sm">Completed: {task.completed ? "Yes" : "No"}</p>
            </div>
            <button onClick={() => {
              if (window.confirm("Are you sure you want to delete this task?")) {
                taskDelete(task.id);
              }
            }} className="text-red-500 font-bold">Delete</button>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
