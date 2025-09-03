import React, { useState } from "react";
import TemplateEditor from "../template/TemplateEditor";
import { createTemplate } from "../../services/templateService";

export default function CreateTemplate() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const userId=localStorage.getItem("userId");
  const baseURL=import.meta.env.VITE_API_BASE_URL;
 
  const unsubscribeUrl = `${baseURL}/contact/${userId}/unsubscribe`;
   console.log(unsubscribeUrl);
  const [content, setContent] = useState(`
    <div style="padding:20px; font-family: Arial, sans-serif; color:#333;">
      <h2 style="color:#4A90E2;">Welcome to Our Newsletter!</h2>
      <p>Hello <strong>Subscriber</strong>,</p>
      <p>
        We're glad to have you here. This is a sample email template.  
        You can customize it using the editor and save it for campaigns.
      </p>
      <a href="#" style="display:inline-block; margin-top:10px; padding:10px 20px; 
         background:#4A90E2; color:#fff; text-decoration:none; border-radius:5px;">
         Call to Action
      </a>
      <p style="margin-top:20px; font-size:12px; color:#777;">
      <p style="font-size:12px; color:#777; text-align:center;">
  You are receiving this email because you subscribed to our mailing list.<br/>
  If you no longer wish to receive these emails, you can 
  <a href="https://yourdomain.com/unsubscribe/{contactId}" 
     style="color:#4A90E2; text-decoration:none;">
     Unsubscribe here
  </a>
    </div>
  `);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Template name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!content.trim()) newErrors.content = "Template content is required.";
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const userId = localStorage.getItem("userId");
    const payload = {
      name,
      description,
      content,
      createdBy: { id: parseInt(userId) },
    };

    console.log("🚀 Payload being sent:", payload);

    try {
      await createTemplate(payload);
      setMessage("✅ Template saved successfully!");
      setName("");
      setDescription("");
      setContent(""); // reset after save
    } catch (error) {
      console.error("Error saving template:", error);
      setMessage("❌ Failed to save template.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create New Email Template</h1>

      {/* Template Name */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Template Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full p-2 border rounded ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full p-2 border rounded ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>

      {/* Template Editor */}
      <div className="mb-6">
        <TemplateEditor
          initialContent={content}
          onChange={(html) => setContent(html)}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-2">{errors.content}</p>
        )}
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Template
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
