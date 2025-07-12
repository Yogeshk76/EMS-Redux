import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    { name: "admin", role: "admin" },
    { name: "alice", role: "user" },
    { name: "bob", role: "user" }
  ]
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}
});

export default userSlice.reducer;