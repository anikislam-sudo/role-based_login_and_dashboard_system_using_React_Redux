import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute({ allowRole }) {
  const { token, role } = useSelector((s) => s.auth);
  if (!token || role !== allowRole) {
    return <Navigate to={`/login/${allowRole}`} replace />;
  }
  return <Outlet />;
}
