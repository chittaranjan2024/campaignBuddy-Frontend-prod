// src/pages/CreateCampaign.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";

export default function CreateCampaign() {
  const [mailingLists, setMailingLists] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedMailingList, setSelectedMailingList] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch Mailing Lists
  useEffect(() => {
    if (!userId || !token) return;
    axios
      .get(`http://localhost:8080/api/mailing-lists/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMailingLists(res.data))
      .catch((err) => console.error("Error fetching mailing lists:", err));
  }, [userId, token]);

  // Fetch Templates
  useEffect(() => {
    if (!userId || !token) return;
    axios
      .get(`http://localhost:8080/api/templates/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTemplates(res.data))
      .catch((err) => console.error("Error fetching templates:", err));
  }, [userId, token]);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !subject || !selectedMailingList || !selectedTemplate) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    const campaignData = {
      title,
      subject,
      status,
      mailingList: { id: selectedMailingList },
      template: { id: selectedTemplate },
      createdBy: { id: userId },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/campaigns",
        campaignData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Campaign created successfully!");
      console.log("Saved campaign:", response.data);

      // Clear form
      setTitle("");
      setSubject("");
      setSelectedMailingList("");
      setSelectedTemplate("");
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("❌ Failed to create campaign");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <PlusCircle className="text-blue-600 h-6 w-6" />
        <h2 className="text-2xl font-bold text-gray-800">Create New Campaign</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Title
          </label>
          <input
            type="text"
            placeholder="Enter campaign title"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            placeholder="Enter email subject"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Mailing List */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mailing List
          </label>
          <select
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            value={selectedMailingList}
            onChange={(e) => setSelectedMailingList(e.target.value)}
          >
            <option value="">-- Select Mailing List --</option>
            {mailingLists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
        </div>

        {/* Template */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Template
          </label>
          <select
            className="w-full p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="">-- Select Template --</option>
            {templates.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition transform hover:scale-[1.02]"
        >
          Save Campaign
        </button>
      </form>
    </div>
  );
}
