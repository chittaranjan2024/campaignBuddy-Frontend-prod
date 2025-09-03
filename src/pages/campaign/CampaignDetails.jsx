import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CampaignDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    fetchCampaignDetails();
  }, []);

  const fetchCampaignDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/campaigns/${id}`);
      setCampaign(res.data);
    } catch (err) {
      console.error('Error fetching campaign details:', err);
    }
  };

  if (!campaign) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{campaign.title}</h1>
      <p className="mb-2"><strong>Subject:</strong> {campaign.subject}</p>
      <p className="mb-2"><strong>Sender Name:</strong> {campaign.senderName}</p>
      <p className="mb-2"><strong>Sender Email:</strong> {campaign.senderEmail}</p>
      <p className="mb-2"><strong>Scheduled At:</strong> {campaign.scheduledAt || 'Not scheduled'}</p>
      
      <div className="my-4">
        <h2 className="text-xl font-semibold mb-2">Email Preview:</h2>
        <div className="border rounded p-4 bg-white shadow" dangerouslySetInnerHTML={{ __html: campaign.htmlContent }} />
      </div>

      <div className="mt-4">
        <Link to={`/campaigns/edit/${campaign.id}`} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2">
          Edit
        </Link>
        <Link to={`/campaigns/schedule/${campaign.id}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Schedule
        </Link>
      </div>
    </div>
  );
};

export default CampaignDetails;
