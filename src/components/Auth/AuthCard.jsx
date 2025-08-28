import React from "react";

export function AuthCard({ title, onSubmit, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        <div className="space-y-4">{children}</div>
      </form>
    </div>
  );
}

export function Input({ placeholder, type = "text", value, onChange }) {
  return (
    <input
      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Submit({ label }) {
  return (
    <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
    >
      {label}
    </button>
  );
}
