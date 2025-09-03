import React, { useState } from "react";

export default function ImportContacts() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [mailingListName] = useState("Newsletter Subscribers"); // Static for now
  const [previewData, setPreviewData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Simulate CSV preview (for demo)
    const dummyCSVData = [
      { name: "Alice Johnson", email: "alice@example.com" },
      { name: "Bob Smith", email: "bob@example.com" },
    ];
    setPreviewData(dummyCSVData);
  };

  const handleImport = () => {
    if (!selectedFile) {
      alert("Please select a file to import.");
      return;
    }

    // Simulate import logic
    console.log("Importing contacts from CSV:", selectedFile.name);
    console.table(previewData);
    alert(`Contacts imported to ${mailingListName} (simulated).`);
    setSelectedFile(null);
    setPreviewData([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Import Contacts</h2>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <p className="text-gray-600">
          Mailing List: <span className="font-semibold">{mailingListName}</span>
        </p>

        <div className="flex flex-col space-y-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="border px-3 py-2 rounded-md"
          />

          {previewData.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700 mb-2">Preview:</h3>
              <ul className="border rounded-md divide-y">
                {previewData.map((contact, index) => (
                  <li key={index} className="px-4 py-2 text-sm text-gray-700">
                    {contact.name} - {contact.email}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleImport}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-fit"
          >
            Import Contacts
          </button>
        </div>
      </div>
    </div>
  );
}
