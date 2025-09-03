import React, { useState, useEffect } from "react";

export default function CampaignActivity() {
  const [campaignStats, setCampaignStats] = useState({
    totalSent: 500,
    opens: 320,
    clicks: 140,
    bounces: 10,
    unsubscribes: 5,
  });

  const [activityLog, setActivityLog] = useState([
    {
      email: "alice@example.com",
      status: "Opened",
      timestamp: "2025-08-20 10:15 AM",
    },
    {
      email: "bob@example.com",
      status: "Clicked",
      timestamp: "2025-08-20 10:30 AM",
    },
    {
      email: "carol@example.com",
      status: "Bounced",
      timestamp: "2025-08-20 11:00 AM",
    },
    {
      email: "dave@example.com",
      status: "Unsubscribed",
      timestamp: "2025-08-20 11:15 AM",
    },
  ]);

  const openRate = ((campaignStats.opens / campaignStats.totalSent) * 100).toFixed(1);
  const clickRate = ((campaignStats.clicks / campaignStats.totalSent) * 100).toFixed(1);
  const bounceRate = ((campaignStats.bounces / campaignStats.totalSent) * 100).toFixed(1);
  const unsubscribeRate = ((campaignStats.unsubscribes / campaignStats.totalSent) * 100).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Campaign Activity Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <InsightCard label="Open Rate" value={`${openRate}%`} progress={openRate} />
        <InsightCard label="Click Rate" value={`${clickRate}%`} progress={clickRate} />
        <InsightCard label="Bounce Rate" value={`${bounceRate}%`} progress={bounceRate} />
        <InsightCard label="Unsubscribes" value={`${unsubscribeRate}%`} progress={unsubscribeRate} />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recipient Activity Log</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 font-medium">
              <tr>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {activityLog.map((entry, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-2">{entry.email}</td>
                  <td className="px-4 py-2">{entry.status}</td>
                  <td className="px-4 py-2">{entry.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ label, value, progress }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-800 mb-2">{value}</p>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
