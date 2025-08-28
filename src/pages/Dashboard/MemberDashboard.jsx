import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";

export default function MemberDashboard() {
  const mp = useSelector((s) => s.data.memberPoints);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 sec delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout title="Member Dashboard">
      <div className="relative min-h-[300px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card
                label="Total Points"
                value={mp.total}
                tone="from-blue-500 to-blue-600"
              />
              <Card
                label="Points Earned"
                value={mp.earned}
                tone="from-green-500 to-green-600"
              />
              <Card
                label="Points Redeemed"
                value={mp.redeemed}
                tone="from-purple-500 to-purple-600"
              />
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-3">
                Recent Transactions
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2">Type</th>
                      <th className="text-left px-4 py-2">Points</th>
                      <th className="text-left px-4 py-2">Description</th>
                      <th className="text-left px-4 py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {mp.transactions.map((t) => (
                      <tr key={t.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              t.type === "Earned"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {t.type}
                          </span>
                        </td>
                        <td className="px-4 py-2 font-medium">
                          <span
                            className={
                              t.amount > 0 ? "text-green-600" : "text-red-600"
                            }
                          >
                            {t.amount > 0 ? "+" : ""}
                            {t.amount}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {t.description}
                        </td>
                        <td className="px-4 py-2 text-gray-600">{t.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

function Card({ label, value, tone }) {
  return (
    <div
      className={`text-white text-center rounded-xl p-6 bg-gradient-to-r ${tone}`}
    >
      <p className="text-sm opacity-90">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
