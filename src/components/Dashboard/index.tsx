"use client";
import React from "react";
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
    </div>
  );
};

export default Dashboard;
