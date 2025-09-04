import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Utility function to get token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

const MailingList = () => {
  const navigate = useNavigate();
  const [mailingLists, setMailingLists] = useState([]);

  useEffect(() => {
    fetchMailingLists();
  }, []);
    const userId = localStorage.getItem("userId");

  const fetchMailingLists = async () => {
    try {
      const response = await axios.get(`https://campaignbuddy-prod.onrender.com/api/mailing-lists/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setMailingLists(response.data);
    } catch (error) {
      console.error("Failed to fetch mailing lists", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mailing Lists</h1>
        <div className="space-x-2">
          <button
            onClick={() => navigate("/create-list")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Mailing List
          </button>
          <button
            onClick={() => navigate("/import-contacts")}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Import Contacts
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {mailingLists.map((list) => (
          <div
            key={list.id}
            className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{list.name}</h2>
              <p className="text-sm text-gray-600">
                Contacts: {list.contacts?.length || 0} | Created: {new Date(list.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => navigate(`/mailing-list-details/${list.id}`)}
                className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
              >
                View
              </button>
              <button
                onClick={() => navigate(`/edit-list/${list.id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  navigate(`/add-contacts-to-list/${list.id}`)
                }
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Add Contacts
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MailingList;
