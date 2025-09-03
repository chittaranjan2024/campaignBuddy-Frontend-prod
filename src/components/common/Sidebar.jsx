import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: "🏠" },
    { label: "Campaigns", path: "/campaign-list", icon: "📢" },
    { label: "Templates", path: "/templates", icon: "📝" },
    { label: "Contacts", path: "/contact/manage", icon: "👥" },
    { label: "Mailing list", path: "/mailing-list", icon: "📧" },
    { label: "Reports", path: "/campaign-activity", icon: "📊" },
    { label: "Settings", path: "/account-settings", icon: "⚙️" },
    { label: "About", path: "#", icon: "🧑‍💻" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-gray-100 shadow-xl flex flex-col">
      {/* Branding */}
      <div className="py-6 px-4 text-2xl font-bold flex items-center justify-center space-x-2 border-b border-gray-700">
        <span className="text-cyan-400 animate-pulse">📧</span>
        <span>Campaign<span className="text-pink-500">Buddy</span></span>
      </div>

      {/* Menu */}
      <nav className="mt-6 flex flex-col space-y-2 px-2 flex-1">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 transform
                ${isActive 
                  ? "bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg scale-105" 
                  : "hover:bg-gray-800 hover:text-cyan-400 hover:scale-105"} 
                `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-6 text-center text-sm text-gray-500 border-t border-gray-700">
        &copy; 2025 CampaignBuddy
      </div>
    </aside>
  );
}
      