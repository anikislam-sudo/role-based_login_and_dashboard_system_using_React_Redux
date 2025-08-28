import React, { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";

export default function AdminDashboard() {
  const users = useSelector((s) => s.data.users);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 second delay to show loader
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(
    () =>
      users.filter((u) =>
        (u.name + u.email).toLowerCase().includes(q.toLowerCase())
      ),
    [users, q]
  );

  return (
    <Layout title="Admin Dashboard">
      <div className="relative min-h-[300px]">
        {loading ? (
          // Loader in the middle of children section
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between gap-4 md:gap-36 mb-4">
              <h2 className="text-xs sm:text-lg font-semibold break-words">
                Manage Users / Merchants
              </h2>
              <input
                className="border rounded px-3 py-1 sm:py-2"
                placeholder="Search..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2">Name</th>
                    <th className="text-left px-4 py-2">Email</th>
                    <th className="text-left px-4 py-2">Role</th>
                    <th className="text-left px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{u.name}</td>
                      <td className="px-4 py-2">{u.email}</td>
                      <td className="px-4 py-2">
                        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            u.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
