import React from "react";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaShoppingBag, FaTruck, FaCheckCircle } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <FaUserCircle className="text-5xl text-gray-500" />
          <div>
            <h1 className="text-2xl font-bold">My Dashboard</h1>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-400">User ID: {user?.uid}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <FaShoppingBag className="text-3xl text-blue-500" />
          <div>
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-2xl font-bold">0</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <FaTruck className="text-3xl text-yellow-500" />
          <div>
            <p className="text-gray-500">In Delivery</p>
            <h2 className="text-2xl font-bold">0</h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
          <FaCheckCircle className="text-3xl text-green-500" />
          <div>
            <p className="text-gray-500">Completed</p>
            <h2 className="text-2xl font-bold">0</h2>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>

        <div className="text-center text-gray-500 py-10">
          <p>No orders yet</p>
          <p className="text-sm">Your orders will appear here after payment</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
