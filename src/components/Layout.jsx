import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link } from "react-router";

export default function Layout({ title, children }) {
  const dispatch = useDispatch();
  const { role } = useSelector((s) => s.auth);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-sm md:text-xl font-semibold">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm px-2 py-1 rounded bg-gray-100">
              Role: {role}
            </span>
            <button
              onClick={() => dispatch(logout())}
              className="px-3  py-1© sm:py-2 text-white bg-gray-800 rounded hover:bg-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">{children}</main>

      <footer className="text-center py-6 text-xs text-gray-500">
        <Link className="underline" to="/">
          Home
        </Link>
      </footer>
    </div>
  );
}
