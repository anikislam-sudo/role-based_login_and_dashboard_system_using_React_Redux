import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router";
import { AuthCard, Input, Submit } from "../../components/Auth/AuthCard";

export default function MerchantLogin() {
  const [storeName, setStoreName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!storeName) newErrors.storeName = "Store name is required";
    else if (storeName.length < 2)
      newErrors.storeName = "Store name must be at least 2 characters";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = "merchant-token-" + Date.now();
    localStorage.setItem("merchant-token", token);

    dispatch(loginSuccess({ token, role: "merchant", user: { storeName } }));
    navigate("/dashboard/merchant");
  };

  return (
    <AuthCard title="Merchant Login" onSubmit={handleSubmit}>
      <div>
        <Input
          placeholder="Store Name"
          value={storeName}
          onChange={setStoreName}
        />
        {errors.storeName && (
          <p className="text-red-600 text-xs mt-1">{errors.storeName}</p>
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
        <Link className="text-indigo-600" to="/register/merchant">
          Register
        </Link>
      </p>
    </AuthCard>
  );
}
