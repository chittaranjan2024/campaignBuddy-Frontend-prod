import React, { useState } from "react";
import axios from "axios";

export default function CreateMailingList() {
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token"); // 🟢 Get token
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/mailing-lists/create",
        {
          name: listName,
          description: description,
          userId: userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🟢 Add Bearer token
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Mailing List created successfully!");
      setListName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating mailing list:", error);
      setMessage("Failed to create mailing list");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Create Mailing List</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            List Name
          </label>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            required
            className="w-full border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 px-3 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {message && (
          <div className="mb-4 text-sm text-blue-600">{message}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Create List"}
        </button>
      </form>
    </div>
  );
}
