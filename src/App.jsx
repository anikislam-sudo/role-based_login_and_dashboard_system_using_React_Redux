import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";

import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import AdminLogin from "./pages/Login/AdminLogin.jsx";
import MerchantLogin from "./pages/Login/MerchantLogin.jsx";
import MemberLogin from "./pages/Login/MemberLogin.jsx";

import AdminRegister from "./pages/Register/AdminRegister.jsx";
import MerchantRegister from "./pages/Register/MerchantRegister.jsx";
import MemberRegister from "./pages/Register/MemberRegister.jsx";

import AdminDashboard from "./pages/Dashboard/AdminDashboard.jsx";
import MerchantDashboard from "./pages/Dashboard/MerchantDashboard.jsx";
import MemberDashboard from "./pages/Dashboard/MemberDashboard.jsx";

import Loader from "./components/Loader.jsx";

export default function App() {
  const loading = useSelector((state) => state.loader.loading);

  return (
    <>
      {loading && <Loader />}
      <Routes>
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/merchant" element={<MerchantLogin />} />
        <Route path="/login/member" element={<MemberLogin />} />

        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/register/merchant" element={<MerchantRegister />} />
        <Route path="/register/member" element={<MemberRegister />} />

        <Route element={<ProtectedRoute allowRole="admin" />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowRole="merchant" />}>
          <Route path="/dashboard/merchant" element={<MerchantDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowRole="member" />}>
          <Route path="/dashboard/member" element={<MemberDashboard />} />
        </Route>

        <Route path="/" element={<Navigate to="/login/admin" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
