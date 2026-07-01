import React, { useState } from 'react';
import { FaRegNewspaper, FaRegClock, FaUsers, FaChartLine, FaImage, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('Last 24 Hours');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1e293b] mb-1">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome back, Super Admin.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              <FaRegClock className="mr-2 text-gray-500" /> {timeRange}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-lg rounded-xl z-10 overflow-hidden">
                {['Today', 'Last 24 Hours', 'Last 7 Days', 'This Month'].map(range => (
                  <button 
                    key={range}
                    onClick={() => { setTimeRange(range); setShowDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 font-medium"
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link 
            to="/admin/news"
            className="bg-[#c8102e] text-white px-5 py-2 rounded-lg shadow-lg shadow-red-900/20 font-bold hover:bg-[#a00d25] transition-colors whitespace-nowrap"
          >
            + New Article
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total News", value: "1256", icon: FaRegNewspaper, color: "bg-blue-500", text: "text-blue-500" },
          { title: "Pending Approval", value: "0", icon: FaRegClock, color: "bg-orange-500", text: "text-orange-500" },
          { title: "Active Employees", value: "5", icon: FaUsers, color: "bg-green-500", text: "text-green-500" },
          { title: "Today's Views", value: "1412", icon: FaChartLine, color: "bg-purple-500", text: "text-purple-500" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center">
              <div className={`w-12 h-12 rounded-xl ${stat.color} text-white flex items-center justify-center text-xl shrink-0 mr-4 shadow-sm`}>
                <Icon />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-500">{stat.title}</span>
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[400px]">
          <h2 className="text-xl font-bold text-[#1e293b] mb-6 flex items-center">
            <FaChartLine className="mr-2 text-brand-red" /> Recent Activity
          </h2>
          
          <div className="flex flex-col gap-4">
            {/* Activity Item */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50/50 border border-blue-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-500 flex items-center justify-center mr-4">
                  <FaImage />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-800">
                    New newspaper edition published: <span className="text-brand-red">Main Edition</span>
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">1 July 2026 • 1 pages</p>
                </div>
              </div>
              <div className="flex items-center text-sm font-bold text-brand-red cursor-pointer hover:text-red-800">
                Manage
              </div>
            </div>
          </div>
        </div>

        {/* Top Contributors */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 min-h-[400px]">
          <h2 className="text-xl font-bold text-[#1e293b] mb-6 flex items-center">
            <FaUserTie className="mr-2 text-brand-red" /> Top Contributors
          </h2>
          
          <div className="flex flex-col gap-6">
            {[
              { name: "madhasu sathish", posts: 513 },
              { name: "Super Admin", posts: 512 },
              { name: "akunuri prudvi", posts: 227 },
              { name: "testq", posts: 2 },
              { name: "Test Employee", posts: 0 },
            ].map((user, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mr-3 overflow-hidden p-1">
                     <img src="/balagam_logo_final.png" alt="Avatar" className="w-full h-full object-contain opacity-80" />
                  </div>
                  <span className="font-bold text-sm text-[#1e293b]">{user.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-sm text-[#1e293b] leading-tight">{user.posts}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Posts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
