import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const user = {
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* App Branding */}
        <div className="flex items-center space-x-2">
          <div className="text-3xl">📧</div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            Campaign<span className="text-blue-600">Buddy</span>
          </h1>
        </div>

        {/* User Info and Logout */}
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
            {user.name[0]}
          </div>
          <button
            onClick={handleLogout}
            className="hidden sm:block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
