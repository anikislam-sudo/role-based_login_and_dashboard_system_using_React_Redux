import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import {
  approvePurchase,
  updateContributionRate,
} from "../../redux/slices/dataSlice";

export default function MerchantDashboard() {
  const dispatch = useDispatch();
  const { purchases, customers, contributionRate, notifications } = useSelector(
    (s) => s.data
  );

  const [tab, setTab] = useState("purchases");
  const [q, setQ] = useState("");
  const [rate, setRate] = useState(contributionRate);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);

  const filteredCustomers = useMemo(
    () =>
      customers.filter((c) =>
        (c.name + c.email).toLowerCase().includes(q.toLowerCase())
      ),
    [customers, q]
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (newTab) => {
    setTabLoading(true);
    setTimeout(() => {
      setTab(newTab);
      setTabLoading(false);
    }, 300);
  };

  if (loading) {
    return (
      <Layout title="Merchant Dashboard">
        <div className="flex items-center justify-center h-64">
          <Loader />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Merchant Dashboard">
      <div className="bg-white rounded-xl shadow relative">
        {/* Tabs */}
        <div className="border-b overflow-x-auto md:overflow-x-visible">
          <div className="flex flex-nowrap items-center gap-4 md:gap-36 px-3 sm:px-6 md:justify-center">
            {[
              ["purchases", "Approve Purchases"],
              ["customers", "Customer Lookup"],
              ["rate", "Contribution Rate"],
              ["notifications", "Notifications"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`py-2 text-sm sm:text-base border-b-2 -mb-px flex-shrink-0 ${
                  tab === id
                    ? "border-indigo-600 text-indigo-600 font-medium"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 relative min-h-[300px]">
          {tabLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
              <Loader />
            </div>
          )}

          {!tabLoading && (
            <>
              {/* Purchases */}
              {tab === "purchases" && (
                <div>
                  <h3 className="font-semibold mb-3 text-base sm:text-lg">
                    Purchase Approvals
                  </h3>
                  <div className="overflow-x-auto rounded-lg">
                    <table className="w-full min-w-[600px] text-xs sm:text-sm table-auto">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left px-2 sm:px-4 py-2">
                            Customer
                          </th>
                          <th className="text-left px-2 sm:px-4 py-2">
                            Amount
                          </th>
                          <th className="text-left px-2 sm:px-4 py-2">Date</th>
                          <th className="text-left px-2 sm:px-4 py-2">
                            Status
                          </th>
                          <th className="text-left px-2 sm:px-4 py-2">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {purchases.map((p) => (
                          <tr key={p.id} className="hover:bg-gray-50">
                            <td className="px-2 sm:px-4 py-2">{p.customer}</td>
                            <td className="px-2 sm:px-4 py-2">
                              ${p.amount.toFixed(2)}
                            </td>
                            <td className="px-2 sm:px-4 py-2">{p.date}</td>
                            <td className="px-2 sm:px-4 py-2">
                              <span
                                className={`px-2 py-1 text-xs rounded ${
                                  p.status === "Approved"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {p.status}
                              </span>
                            </td>
                            <td className="px-2 sm:px-4 py-2">
                              {p.status === "Pending" && (
                                <button
                                  onClick={() =>
                                    dispatch(approvePurchase(p.id))
                                  }
                                  className="px-2 sm:px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs sm:text-sm"
                                >
                                  Approve
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Customers */}
              {tab === "customers" && (
                <div>
                  <h3 className="font-semibold mb-3 text-base sm:text-lg">
                    Customer Lookup
                  </h3>
                  <input
                    className="border rounded px-3 py-2 mb-4 w-full max-w-md"
                    placeholder="Search customers..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                  <div className="grid gap-3">
                    {filteredCustomers.map((c) => (
                      <div
                        key={c.id}
                        className="bg-gray-50 rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <p className="font-medium">{c.name}</p>
                          <p className="text-sm text-gray-600">{c.email}</p>
                          <p className="text-sm text-gray-600">{c.phone}</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-lg sm:text-xl font-bold text-indigo-600">
                            {c.points}
                          </p>
                          <p className="text-xs text-gray-500">Points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contribution Rate */}
              {tab === "rate" && (
                <div>
                  <h3 className="font-semibold mb-3 text-base sm:text-lg">
                    Set Contribution Rate
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatch(updateContributionRate(rate));
                    }}
                    className="max-w-xs w-full"
                  >
                    <label className="block text-sm mb-1">
                      Contribution Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={rate}
                      onChange={(e) => setRate(parseFloat(e.target.value))}
                      className="border rounded px-3 py-2 w-full"
                    />
                    <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full sm:w-auto">
                      Update Rate
                    </button>
                  </form>
                  <div className="mt-4 p-3 bg-blue-50 rounded text-sm sm:text-base">
                    Current rate: <b>{contributionRate}%</b>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {tab === "notifications" && (
                <div>
                  <h3 className="font-semibold mb-3 text-base sm:text-lg">
                    Notifications
                  </h3>
                  <div className="space-y-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="bg-gray-50 rounded p-4">
                        <p className="text-sm">{n.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
