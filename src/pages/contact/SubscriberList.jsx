import React, { useEffect, useState } from "react";
import { getAllSubscribedContacts, toggleSubscription } from "../../services/contactService";

export default function SubscriberList() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await getAllSubscribedContacts(userId);
      const data = Array.isArray(response) ? response : [];
      setSubscribers(data);
    } catch (err) {
      console.error("Error fetching subscribers:", err);
      setError("Failed to load subscribers.");
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      // Call backend to toggle subscription
      const updatedContact = await toggleSubscription(id);

      // Update local state based on backend response
      setSubscribers((prev) =>
        prev.map((sub) =>
          sub.id === id ? { ...sub, subscribed: updatedContact.subscribed } : sub
        )
      );
    } catch (error) {
      console.error("Failed to toggle subscription:", error);
      alert("Error updating subscription status");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">📬 Subscribers</h1>

      {subscribers.length === 0 ? (
        <p className="text-gray-500">No subscribers found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-3 border-b">{sub.name}</td>
                  <td className="px-6 py-3 border-b">{sub.email}</td>
                  <td className="px-6 py-3 border-b">{sub.phone || "N/A"}</td>
                  <td className="px-6 py-3 border-b">
                    {sub.subscribed ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                        Subscribed
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">
                        Unsubscribed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3 border-b text-center">
                    <button
                      onClick={() => handleToggle(sub.id)}
                      className={`px-4 py-2 rounded-lg text-white font-medium shadow-md transition duration-200 ${
                        sub.subscribed
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {sub.subscribed ? "Unsubscribe" : "Subscribe"}
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
