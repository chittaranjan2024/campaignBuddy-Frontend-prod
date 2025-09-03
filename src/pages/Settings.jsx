import React, { useState } from 'react';

const Settings = () => {
  const [senderName, setSenderName] = useState('Your Brand');
  const [senderEmail, setSenderEmail] = useState('no-reply@yourbrand.com');

  const handleSave = () => {
    alert('Settings saved');
    // Save to backend
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Campaign Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Sender Name</label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Sender Email</label>
          <input
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
