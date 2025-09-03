import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!userId || !token) return;
      try {
        const res = await axios.get(
          `http://localhost:8080/api/campaigns/created-by/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCampaigns(res.data || []);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [userId, token]);

  if (loading) return <p className="p-6">Loading campaigns...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Campaign List</h2>
          <Link to="/create-campaign">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              + Create Campaign
            </button>
          </Link>
        </div>

        <table className="w-full table-auto border">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Subject</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length > 0 ? (
              campaigns.map((c) => (
                <tr key={c.id} className="text-center">
                  <td className="py-2 px-4 border">{c.id}</td>
                  <td className="py-2 px-4 border">{c.title}</td>
                  <td className="py-2 px-4 border">{c.subject}</td>
                  <td className="py-2 px-4 border">{c.status}</td>
                  <td className="py-2 px-4 border space-x-2">
                    <Link to={`/edit-campaign/${c.id}`}>
                      <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                        Edit
                      </button>
                    </Link>
                    <Link to={`/send-campaign/${c.id}`}>
                      <button className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">
                        Send
                      </button>
                    </Link>
                    <Link to={`/schedule-campaign/${c.id}`}>
                      <button className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700">
                        Schedule
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">
                  No campaigns found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
