import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Panel" };

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fa] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1c1d1f] mb-2">Admin Panel</h1>
        <p className="text-[#6a6f73] text-sm mb-8">Platform management and analytics</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Users", value: "12,450", change: "+234 this week" },
            { label: "Active Courses", value: "284", change: "+12 this month" },
            { label: "Total Revenue", value: "$48,920", change: "+$3,200 this week" },
            { label: "Completion Rate", value: "67%", change: "+2% vs last month" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-[#d1d7dc] rounded-xl p-5 shadow-sm">
              <div className="text-2xl font-extrabold text-[#1c1d1f]">{stat.value}</div>
              <div className="text-xs font-semibold text-[#6a6f73] mt-1">{stat.label}</div>
              <div className="text-xs text-[#1e7e34] mt-2">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Tabs placeholder */}
        <div className="bg-white border border-[#d1d7dc] rounded-xl shadow-sm">
          <div className="flex border-b border-[#d1d7dc] px-5">
            {["Courses", "Users", "Orders", "Analytics"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors duration-150 ${
                  tab === "Courses"
                    ? "border-[#0056d2] text-[#0056d2]"
                    : "border-transparent text-[#6a6f73] hover:text-[#1c1d1f]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-8 text-center text-[#6a6f73]">
            <p className="text-sm">Course management will be implemented here.</p>
            <button className="mt-4 bg-[#0056d2] hover:bg-[#004ab3] text-white font-semibold px-6 py-2 rounded text-sm transition-colors duration-150">
              + Add New Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
