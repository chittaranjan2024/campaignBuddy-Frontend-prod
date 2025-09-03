import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import { createTemplate, getTemplatesByUser } from "../../services/templateService";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate(); // ✅ initialize navigate

  const getUserId = () => localStorage.getItem("userId");
  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const userId = getUserId();
      const token = getToken();
      const res = await getTemplatesByUser(userId, token);
      setTemplates(res);
    } catch (err) {
      console.error("Failed to load templates", err);
    }
  };

  const handlePreview = (html) => {
    const previewWindow = window.open("", "_blank");
    previewWindow.document.open();
    previewWindow.document.write(`
      <html>
        <head><title>Template Preview</title></head>
        <body>${html}</body>
      </html>
    `);
    previewWindow.document.close();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Email Templates</h1>
        {/* ✅ Button to redirect to Create New Template page */}
     
      </div>
   <button
          onClick={() => navigate("/templates/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create New Template
        </button>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Browse All Templates</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <div
              key={template.id || index}
              className="bg-white p-4 shadow rounded border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{template.description}</p>
              <iframe
                srcDoc={template.content}
                title={`Template-${index}`}
                sandbox=""
                className="w-full h-48 border mb-2"
              />
              <button
                onClick={() => handlePreview(template.content)}
                className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600"
              >
                Preview
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
