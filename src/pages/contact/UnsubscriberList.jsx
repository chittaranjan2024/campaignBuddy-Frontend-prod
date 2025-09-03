import React, { useEffect, useState } from "react";
import { getAllUnsubscribedContacts, toggleSubscription } from "../../services/contactService";

export default function UnsubscriberList() {
  const [unsubscribers, setUnsubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchUnsubscribers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchUnsubscribers = async () => {
    try {
      const response = await getAllUnsubscribedContacts(userId);
      setUnsubscribers(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Error fetching unsubscribers:", err);
      setError("Failed to load unsubscribers.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleSubscription(id); // calls backend to subscribe
      setUnsubscribers((prev) => prev.filter((u) => u.id !== id)); // remove from unsubscribers list
    } catch (err) {
      console.error("Failed to resubscribe:", err);
      alert("Error updating subscription status");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-600">🚫 Unsubscribers</h1>

      {unsubscribers.length === 0 ? (
        <p className="text-gray-500">No unsubscribers found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-red-100 text-gray-700">
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {unsubscribers.map((unsub) => (
                <tr key={unsub.id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-3 border-b">{unsub.name}</td>
                  <td className="px-6 py-3 border-b">{unsub.email}</td>
                  <td className="px-6 py-3 border-b">{unsub.phone || "N/A"}</td>
                  <td className="px-6 py-3 border-b">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">
                      Unsubscribed
                    </span>
                  </td>
                  <td className="px-6 py-3 border-b text-center">
                    <button
                      onClick={() => handleToggle(unsub.id)}
                      className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-md transition duration-200"
                    >
                      Resubscribe
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
