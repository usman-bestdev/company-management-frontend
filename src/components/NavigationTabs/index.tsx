import React, { useState } from "react";

const NavigationTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Service Fee");

  const tabs = [
    "Company Information",
    "Financials",
    "Compliance",
    "Team",
    "Service Fee",
    "Accounts",
  ];

  return (
    <div className="w-full bg-white shadow-md rounded-lg  md:rounded-full mt-[26px]">
      <div className="overflow-x-auto">
        <div className="flex flex-nowrap items-center justify-between space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex-1  text-center px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full ${
                activeTab === tab
                  ? "bg-[#F8F8F9] text-[#14151A] border border-[#E9E9E9]"
                  : "text-[#4D4D4D] hover:bg-[#F8F8F9]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;
