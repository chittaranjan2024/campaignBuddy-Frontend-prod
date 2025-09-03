import { Link } from "react-router-dom";
import {
  BarChart2,
  Users,
  Mail,
  Activity,
  PlusCircle,
  BookOpen,
  Layers,
} from "lucide-react";

const name = localStorage.getItem("name");

export default function Dashboard() {
  return (
    <main className="flex-1 bg-gray-50 p-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, <span className="text-blue-600">{name}</span>
        </h1>
        <p className="text-gray-600 text-sm">
          Here’s a quick overview of your campaigns.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          icon={<Layers className="text-blue-500 w-5 h-5" />}
          title="Total Campaigns"
          value="12"
        />
        <SummaryCard
          icon={<Users className="text-green-500 w-5 h-5" />}
          title="Subscribers"
          value="3,250"
        />
        <SummaryCard
          icon={<Mail className="text-yellow-500 w-5 h-5" />}
          title="Emails Sent"
          value="10,200"
        />
        <SummaryCard
          icon={<Activity className="text-purple-500 w-5 h-5" />}
          title="Open Rate"
          value="45%"
        />
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ActionCard
          icon={<PlusCircle className="text-blue-600 w-6 h-6" />}
          title="New Campaign"
          description="Start a new email campaign."
          buttonText="Create"
          link="/campaign-list"
        />
        <ActionCard
          icon={<Users className="text-green-600 w-6 h-6" />}
          title="Contacts"
          description="Manage your subscribers."
          buttonText="Manage"
          link="/contact/manage"
        />
        <ActionCard
          icon={<BookOpen className="text-yellow-600 w-6 h-6" />}
          title="Templates"
          description="Choose or design templates."
          buttonText="Browse"
          link="/templates"
        />
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-md border p-6">
        <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-indigo-600" /> Campaign Performance
          (Coming Soon)
        </h2>
        <div className="h-40 flex items-center justify-center text-gray-400 border border-dashed rounded-md">
          📊 Chart Area
        </div>
      </div>
    </main>
  );
}

function SummaryCard({ icon, title, value }) {
  return (
    <div className="bg-white p-4 rounded-md border">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-sm text-gray-500">{title}</h3>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function ActionCard({ icon, title, description, buttonText, link }) {
  return (
    <div className="bg-white p-4 rounded-md border">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <Link
        to={link}
        className="inline-block text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
      >
        {buttonText}
      </Link>
    </div>
  );
}
