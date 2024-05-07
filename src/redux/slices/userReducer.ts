import { createSlice } from "@reduxjs/toolkit";
import getLocalStorageData from "../../utils/getLocalStorageData.ts";

export type userT = {
  password: string;
  username: string;
  role: string;
};

interface initialStateI {
  users: userT[];
  currentUser: null | userT;
  error: string;
}

const initialState: initialStateI = {
  users: [
    {
      password: "adminPassword",
      username: "ivan@vtb.ru",
      role: "admin",
    },
    {
      password: "userPassword",
      username: "sasha@vtb.ru",
      role: "user",
    },
  ],
  currentUser: getLocalStorageData().currentUser || null,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      const user = state.users.find(
        (elem) =>
          elem.username === action.payload.email &&
          elem.password === action.payload.password
      );
      if (user) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
        state.error = "";
      } else {
        state.currentUser = null;
        state.error = "Вы ввели неверный логин/пароль";
      }
    },
    handleExit: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export default userSlice.reducer;
export const { handleLogin, handleExit } = userSlice.actions;
