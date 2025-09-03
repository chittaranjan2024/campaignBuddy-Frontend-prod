import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SendCampaign() {
  const { id } = useParams(); // Campaign ID from URL
  const [campaign, setCampaign] = useState(null);
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

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

  // Send campaign
  const handleSend = async () => {
    if (!campaign) return;

    if (campaign.status === "SENT") {
      alert("This campaign has already been sent and cannot be sent again.");
      return;
    }

    if (campaign.status === "CANCELED") {
      alert("This campaign was canceled and cannot be sent.");
      return;
    }

    setSending(true);
    setConfirmation("");

    try {
      const res = await axios.post(
        `http://localhost:8080/api/campaigns/${campaign.id}/send`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setConfirmation(`Campaign "${res.data.title}" has been sent successfully!`);
      setCampaign(res.data); // update status in UI
    } catch (err) {
      console.error(err);
      setConfirmation("Failed to send campaign. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p>Loading campaign...</p>;
  if (!campaign) return <p>Campaign not found.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Send Email Campaign</h2>

        {/* Campaign Info */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Campaign Name</label>
          <input
            type="text"
            value={campaign.title}
            disabled
            className="w-full border rounded p-2 bg-gray-200"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Recipient List</label>
          <input
            type="text"
            value={campaign.mailingList?.name || "No mailing list assigned"}
            disabled
            className="w-full border rounded p-2 bg-gray-200"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={sending || campaign.status === "SENT" || campaign.status === "CANCELED"}
          className={`px-4 py-2 rounded text-white ${
            sending || campaign.status === "SENT" || campaign.status === "CANCELED"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {sending ? "Sending..." : "Send Now"}
        </button>

        {confirmation && (
          <p className="mt-4 text-green-700 font-medium">{confirmation}</p>
        )}
      </div>
    </div>
  );
}
