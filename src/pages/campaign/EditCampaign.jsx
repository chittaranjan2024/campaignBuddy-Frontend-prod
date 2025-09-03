// src/pages/EditCampaign.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [campaign, setCampaign] = useState(null);
  const [mailingLists, setMailingLists] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedMailingList, setSelectedMailingList] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const isEditable = campaign?.status === "DRAFT" || campaign?.status === "SCHEDULED";

  // Fetch campaign details
  useEffect(() => {
    if (!id || !token) return;

    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCampaign(res.data);
        setTitle(res.data.title || "");
        setSubject(res.data.subject || "");
        setSelectedMailingList(res.data.mailingList?.id || "");
        setSelectedTemplate(res.data.template?.id || "");
      } catch (err) {
        console.error("Error fetching campaign:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id, token]);

  // Fetch mailing lists
  useEffect(() => {
    if (!userId || !token) return;
    axios
      .get(`http://localhost:8080/api/mailing-lists/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMailingLists(res.data))
      .catch((err) => console.error("Error fetching mailing lists:", err));
  }, [userId, token]);

  // Fetch templates
  useEffect(() => {
    if (!userId || !token) return;
    axios
      .get(`http://localhost:8080/api/templates/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTemplates(res.data))
      .catch((err) => console.error("Error fetching templates:", err));
  }, [userId, token]);

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!subject.trim()) newErrors.subject = "Subject is required";
    if (!selectedMailingList) newErrors.mailingList = "Please select a mailing list";
    if (!selectedTemplate) newErrors.template = "Please select a template";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updatedCampaign = {
      title,
      subject,
      mailingList: { id: selectedMailingList },
      template: { id: selectedTemplate },
      createdBy: { id: userId },
    };

    try {
      const res = await axios.put(
        `http://localhost:8080/api/campaigns/${id}`,
        updatedCampaign,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Campaign updated successfully!");
      navigate("/campaign-list");
    } catch (err) {
      console.error("Error updating campaign:", err);
      alert("❌ Failed to update campaign");
    }
  };

  if (loading) return <p>Loading campaign...</p>;
  if (!campaign) return <p>Campaign not found.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Campaign</h2>

      {!isEditable && (
        <p className="text-red-600 font-medium mb-4">
          Cannot edit a campaign that is {campaign.status}.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Campaign Title"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!isEditable}
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-2 border rounded"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={!isEditable}
          />
          {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
        </div>

        <div>
          <select
            className="w-full p-2 border rounded"
            value={selectedMailingList}
            onChange={(e) => setSelectedMailingList(e.target.value)}
            disabled={!isEditable}
          >
            <option value="">Select Mailing List</option>
            {mailingLists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
          {errors.mailingList && <p className="text-red-600 text-sm mt-1">{errors.mailingList}</p>}
        </div>

        <div>
          <select
            className="w-full p-2 border rounded"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            disabled={!isEditable}
          >
            <option value="">Select Template</option>
            {templates.map((tpl) => (
              <option key={tpl.id} value={tpl.id}>
                {tpl.name}
              </option>
            ))}
          </select>
          {errors.template && <p className="text-red-600 text-sm mt-1">{errors.template}</p>}
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700`}
          disabled={!isEditable}
        >
          Update Campaign
        </button>
      </form>
    </div>
  );
}
