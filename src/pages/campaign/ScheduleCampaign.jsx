import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ScheduleCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [scheduling, setScheduling] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch campaign details
  useEffect(() => {
    if (!id || !token) return;

    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCampaign(res.data);
      } catch (err) {
        console.error("Error fetching campaign:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id, token]);

  // Schedule campaign
  const handleSchedule = async (e) => {
    e.preventDefault();
    if (!scheduledAt || !campaign) return;

    // Prevent scheduling if already SENT or CANCELED
    if (campaign.status === "SENT" || campaign.status === "CANCELED") {
      alert(`Cannot schedule a campaign with status "${campaign.status}"`);
      return;
    }

    setScheduling(true);
    try {
      const body = { scheduledAt }; // JSON format
      const res = await axios.post(
        `http://localhost:8080/api/campaigns/${campaign.id}/schedule`,
        body,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Campaign "${res.data.title}" scheduled successfully for ${res.data.scheduledAt}`);
      navigate("/campaign-list"); // Redirect after scheduling
    } catch (err) {
      console.error(err);
      alert("Failed to schedule campaign. Please try again.");
    } finally {
      setScheduling(false);
    }
  };

  if (loading) return <p>Loading campaign details...</p>;
  if (!campaign) return <p>Campaign not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Schedule Campaign</h1>

      {/* Campaign Details */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Campaign Details</h2>
        <p><strong>Name:</strong> {campaign.title}</p>
        <p><strong>Subject:</strong> {campaign.subject}</p>
        <p><strong>Status:</strong> {campaign.status}</p>
        <p><strong>Sender Email:</strong> {campaign.createdBy?.email || "N/A"}</p>
        <p><strong>Mailing List:</strong> {campaign.mailingList?.name || "N/A"}</p>
      </div>

      {/* Schedule Form */}
      <form onSubmit={handleSchedule} className="bg-white p-4 rounded shadow space-y-4">
        <div>
          <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700 mb-1">
            Select Date & Time
          </label>
          <input
            type="datetime-local"
            id="scheduledAt"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={scheduling || campaign.status === "SENT" || campaign.status === "CANCELED"}
          className={`w-full py-2 px-4 rounded text-white ${
            scheduling || campaign.status === "SENT" || campaign.status === "CANCELED"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {scheduling ? "Scheduling..." : "Schedule Campaign"}
        </button>
      </form>
    </div>
  );
};

export default ScheduleCampaign;
