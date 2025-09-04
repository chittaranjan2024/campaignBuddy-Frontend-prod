import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    location: "",
    tags: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    axios
      .get(`https://campaignbuddy-prod.onrender.com/api/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch contact:", err);
        alert("Failed to load contact.");
      });
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) return;

    axios
      .put(`https://campaignbuddy-prod.onrender.com/api/contacts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("Contact updated successfully!");
        navigate("/contacts");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Failed to update contact.");
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-6">✏️ Edit Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Full Name"
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="Phone"
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            placeholder="Company"
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="designation"
            value={formData.designation}
            placeholder="Designation"
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            placeholder="Location"
            onChange={handleChange}
            className="border px-3 py-2 rounded"
          />
          <input
            type="text"
            name="tags"
            value={formData.tags}
            placeholder="Tags (comma-separated)"
            onChange={handleChange}
            className="border px-3 py-2 rounded col-span-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Contact
        </button>
      </form>
    </div>
  );
}
