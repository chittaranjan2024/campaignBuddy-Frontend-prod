import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Get JWT token from localStorage (assumes token was saved after login)
const getToken = () => localStorage.getItem("token");

export default function AllContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem("userId");
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/contacts/user/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        👥 All Contacts
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p className="text-center text-gray-500">No contacts available.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-xl border p-4 shadow hover:shadow-md transition duration-200"
            >
              <div className="mb-3">
                <h3 className="text-xl font-semibold text-gray-800">
                  {contact.name}
                </h3>
                <p className="text-gray-600">{contact.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  📞 {contact.phone} | 🏢 {contact.company}
                </p>
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  {contact.tags}
                </span>
              </div>
              <div className="text-right">
                <Link
                  to={`/contact/edit/${contact.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ✏️ Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
