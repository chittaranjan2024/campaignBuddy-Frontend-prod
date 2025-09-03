import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Utils
const getToken = () => localStorage.getItem("token");
const getUserId = () => localStorage.getItem("userId");

export default function AddContactToMailingList() {
  const { id } = useParams(); // 👈 MUST be inside the component
  const [mailingListId, setMailingListId] = useState(id);
  const [mailingListName, setMailingListName] = useState("Newsletter Subscribers");
  const [availableContacts, setAvailableContacts] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState("");

  // Fetch contacts not in the current mailing list
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const userId = getUserId();
        const response = await axios.get(
          `http://localhost:8080/api/contacts/not-in-mailinglist/${userId}/${mailingListId}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setAvailableContacts(response.data);
      } catch (error) {
        console.error("Failed to load contacts:", error);
      }
    };

    fetchContacts();
  }, [mailingListId]);

  // Handle form submission
  const handleAddContact = async (e) => {
    e.preventDefault();
    if (!selectedContactId) return alert("Please select a contact.");

    try {
      await axios.post(
        `http://localhost:8080/api/mailing-lists/${mailingListId}/contacts/${selectedContactId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      alert("Contact successfully added to mailing list.");
      setSelectedContactId("");
      setAvailableContacts((prev) => prev.filter((c) => c.id !== parseInt(selectedContactId)));
    } catch (error) {
      console.error("Failed to add contact:", error);
      alert("Error adding contact. See console for details.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Contact to Mailing List</h2>

      <p className="mb-2 text-gray-700">
        Mailing List: <span className="font-semibold">{mailingListName}</span>
      </p>

      <form onSubmit={handleAddContact} className="space-y-4">
        <select
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
          value={selectedContactId}
          onChange={(e) => setSelectedContactId(e.target.value)}
          required
        >
          <option value="">-- Select Contact --</option>
          {availableContacts.map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.name} ({contact.email})
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Contact
        </button>
      </form>
    </div>
  );
}
