import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router";
import { AuthCard, Input, Submit } from "../../components/Auth/AuthCard";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = "admin-token-" + Date.now();
    localStorage.setItem("admin-token", token);

    dispatch(
      loginSuccess({
        token,
        role: "admin",
        user: { email, name: "Admin User" },
      })
    );

    navigate("/dashboard/admin");
  };

  return (
    <AuthCard title="Admin Login" onSubmit={handleSubmit}>
      <div>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={setEmail}
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        {errors.password && (
          <p className="text-red-600 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      <Submit label="Sign In" />

      <p className="text-sm mt-3 text-center">
        No account?{" "}
        <Link className="text-indigo-600" to="/register/admin">
          Register
        </Link>
      </p>
    </AuthCard>
  );
}
