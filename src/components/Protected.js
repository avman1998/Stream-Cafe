import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
export default function Protected({ children }) {
  const { user } = UserAuth();
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}
