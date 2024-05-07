import React, { useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import { Box } from "@material-ui/core";
import Main from "./pages/Main.tsx";
import Login from "./pages/Login/Login.tsx";
import Header from "./entities/Header/Header.tsx";
import Footer from "./entities/Footer/Footer.tsx";
import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { handleExit, handleLogin } from "../redux/slices/userReducer.ts";
import ProtectedRoute from "./entities/ProtectedRoute.tsx";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.user);

  function handleSubmit(obj) {
    if (!obj.email || !obj.password) {
      return;
    }
    dispatch(handleLogin(obj));
  }

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <Box
      className="page"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <Header onExit={() => dispatch(handleExit())} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route path="/sign-in" element={<Login onLogin={handleSubmit} />} />
      </Routes>
      <Footer />
    </Box>
  );
}
export default App;
