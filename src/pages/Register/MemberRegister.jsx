import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router";
import { AuthCard, Input, Submit } from "../../components/Auth/AuthCard";

export default function MemberRegister() {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    // Validate contact (phone or email)
    if (!contact) {
      newErrors.contact = "Phone or Email is required";
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      const phoneRegex = /^[0-9]{10,15}$/; // simple phone check
      if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
        newErrors.contact = "Enter a valid phone number or email";
      }
    }

    // Validate password or OTP (at least one required)
    if (!password && !otp) {
      newErrors.auth = "Enter either a password or OTP to register";
    }

    // Password rules
    if (password && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // OTP rules
    if (otp && !/^\d{6}$/.test(otp)) {
      newErrors.otp = "OTP must be a 6-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = "member-token-" + Date.now();
    localStorage.setItem("member-token", token);
    dispatch(loginSuccess({ token, role: "member", user: { contact } }));
    navigate("/dashboard/member");
  };

  return (
    <AuthCard title="Member Registration" onSubmit={onSubmit}>
      <div>
        <Input
          placeholder="Phone or Email"
          value={contact}
          onChange={setContact}
        />
        {errors.contact && (
          <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
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

        <div>
          <Input placeholder="Or OTP" value={otp} onChange={setOtp} />
          {errors.otp && (
            <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
          )}
        </div>
      </div>

      {errors.auth && (
        <p className="text-red-500 text-xs mt-2">{errors.auth}</p>
      )}

      <Submit label="Register" />

      <p className="text-sm mt-3 text-center">
        Already have an account?{" "}
        <Link className="text-indigo-600" to="/login/member">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}
