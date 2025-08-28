import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router"; 
import { AuthCard, Input, Submit } from "../../components/Auth/AuthCard";

export default function MerchantRegister() {
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!storeName) {
      newErrors.storeName = "Store name is required";
    } else if (storeName.length < 2) {
      newErrors.storeName = "Store name must be at least 2 characters";
    }

    if (!storeAddress) {
      newErrors.storeAddress = "Store address is required";
    } else if (storeAddress.length < 5) {
      newErrors.storeAddress = "Store address must be at least 5 characters";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = "merchant-token-" + Date.now();
    localStorage.setItem("merchant-token", token);

    dispatch(
      loginSuccess({
        token,
        role: "merchant",
        user: { storeName, storeAddress },
      })
    );

    navigate("/dashboard/merchant");
  };

  return (
    <AuthCard title="Merchant Registration" onSubmit={onSubmit}>
      <div>
        <Input
          placeholder="Store Name"
          value={storeName}
          onChange={setStoreName}
        />
        {errors.storeName && (
          <p className="text-red-500 text-xs mt-1">{errors.storeName}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Store Address"
          value={storeAddress}
          onChange={setStoreAddress}
        />
        {errors.storeAddress && (
          <p className="text-red-500 text-xs mt-1">{errors.storeAddress}</p>
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
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      <Submit label="Register" />

      <p className="text-sm mt-3 text-center">
        Already have an account?{" "}
        <Link className="text-indigo-600" to="/login/merchant">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}
