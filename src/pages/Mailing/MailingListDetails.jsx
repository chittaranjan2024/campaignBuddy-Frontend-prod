import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
export default function MailingListDetails() {
  const { id } = useParams(); // URL param
  const [mailingList, setMailingList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMailingList = async () => {
      try {
        const token = localStorage.getItem("token"); // Adjust if using another token strategy

        const response = await axios.get(`http://localhost:8080/api/mailing-lists/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMailingList(response.data);
      } catch (err) {
        setError("Failed to load mailing list");
      } finally {
        setLoading(false);
      }
    };

    fetchMailingList();
  }, [id]);

  if (loading) return <div className="p-6 text-gray-700">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Mailing List Details</h1>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">List Name:</h2>
          <p className="text-gray-800">{mailingList.name}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700">Description:</h2>
          <p className="text-gray-800">{mailingList.description}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700">Contacts:</h2>
          {mailingList.contacts && mailingList.contacts.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {mailingList.contacts.map((contact, index) => (
                <li key={index} className="py-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{contact.name}</span>
                    <span className="text-gray-600">{contact.email}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No contacts available.</p>
          )}
        </div>

         <Link
      to={`/contact/new`} // Adjust this route based on your setup
      className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
      Add New Contact
    </Link>&nbsp;&nbsp;
    <Link
      to={`/add-contacts-to-list/${id}`} // Adjust this route based on your setup
      className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
    >
      Add Exiting Contact
    </Link>
      </div>
    </div>
  );
}
