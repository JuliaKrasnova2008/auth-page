import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store.ts";

interface ProtectedRouteI {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteI) {
  const { currentUser } = useAppSelector((state) => state.user);

  if (currentUser) {
    return children;
  } else {
    return <Navigate to={"/sign-in"} replace />;
  }
}
