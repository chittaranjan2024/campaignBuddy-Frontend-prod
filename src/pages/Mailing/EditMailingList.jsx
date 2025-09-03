import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MailingListService from "../../services/MailingListService";

export default function EditMailingList() {
  const { id: mailingListId } = useParams(); // 👈 Get ID from URL params

  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (mailingListId) {
      MailingListService.getMailingListById(mailingListId)
        .then((res) => {
          setListName(res.data.name);
          setDescription(res.data.description);
        })
        .catch((err) => {
          console.error("Failed to fetch mailing list:", err);
          alert("Failed to load mailing list.");
        });
    }
  }, [mailingListId]);

  const handleSave = async () => {
    const updatedMailingList = {
      name: listName,
      description,
    };

    try {
      await MailingListService.updateMailingList(mailingListId, updatedMailingList);
      alert("Mailing list updated!");
    } catch (error) {
      console.error("Error updating mailing list:", error);
      alert("Failed to update mailing list.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Mailing List</h1>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">List Name</label>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
          ></textarea>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
