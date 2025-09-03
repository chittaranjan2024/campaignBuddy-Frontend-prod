import React from "react";
import { Link } from "react-router-dom";

export default function ContactOptions() {
  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">📇 Contact Manager</h2>

      <div className="space-y-4 text-center">
        <Link
          to="/contact/new"
          className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ➕ Add New Contact
        </Link>
        

        <Link
          to="/contact/all"
          className="block px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
        >
          📋 View All Contacts
        </Link>

         <Link
          to="/subscribers-list"
          className="block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ✅ Subscriber List
        </Link>

         <Link
          to="/unsubscribers-list"
          className="block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          ❌ Unsubscriber List
        </Link>
       
      </div>
    </div>
  );
}
