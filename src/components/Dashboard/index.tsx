"use client";
import {
  ArrowsUpDownIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import CompaniesTable from "./CompaniesTable";
import StatsCard from "./StatsCard";

const Dashboard: React.FC = () => {
  const statsData = [
    {
      title: "Total Companies",
      value: 128,
      percentageChange: 3,
      graphData: [10, 25, 20, 35, 40, 55, 60],
      graphColor: "green",
      hasReviewLink: false,
    },
    {
      title: "Active Companies",
      value: 115,
      percentageChange: -2,
      graphData: [60, 55, 100, 105, 30, 20, 15],
      graphColor: "red",
      hasReviewLink: false,
    },
    {
      title: "Pending Companies",
      value: 8,
      percentageChange: 12,
      graphData: [20, 30, 25, 40, 35, 50, 45],
      graphColor: "green",
      hasReviewLink: true,
    },
    {
      title: "Suspended Companies",
      value: 5,
      percentageChange: -2,
      graphData: [10, 15, 8, 12, 7, 10, 5],
      graphColor: "red",
      hasReviewLink: true,
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((data, index) => (
          <StatsCard
            key={index}
            title={data.title}
            value={data.value}
            percentageChange={data.percentageChange}
            graphData={data.graphData}
            graphColor={data.graphColor}
            hasReviewLink={data.hasReviewLink}
          />
        ))}
      </div>
      <div className="bg-white rounded-lg mt-4 border border-[#E9E9E9]">
        <div className="px-6 py-[18px]">
          <h1 className="text-2xl font-bold pb-3">Companies</h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="w-full md:w-[400px]
                px-10 py-2 border border-[#E9E9E9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center mt-4 sm:mt-0 space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm flex items-center space-x-1">
                <FunnelIcon className="h-4 w-4 text-gray-500 mr-1" />
                <span>Filters</span>
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm flex items-center space-x-1">
                <ArrowsUpDownIcon className="h-4 w-4 text-gray-500 mr-1" />
                <span>Sort</span>
              </button>
            </div>
          </div>
        </div>

        <CompaniesTable />
      </div>
    </div>
  );
};

export default Dashboard;
