import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StatsCardProps {
  title: string;
  value: number;
  percentageChange: number;
  graphData: number[];
  graphColor: string;
  period?: string;
  hasReviewLink?: boolean; // New prop for conditionally rendering the link
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  percentageChange,
  graphData,
  graphColor,
  period = "Last 7 days",
  hasReviewLink,
}) => {
  const data = {
    labels: Array(graphData.length).fill(""), // Empty labels for smooth display
    datasets: [
      {
        data: graphData,
        borderColor: graphColor,
        backgroundColor:
          graphColor === "green"
            ? "rgba(38, 189, 108, 0.1)"
            : "rgba(235, 87, 87, 0.1)", // Conditional background color
        fill: true, // Fills the area under the line
        tension: 0.4, // Smooth curve for the line
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
    },
    elements: {
      point: {
        radius: 0, // Removes the points
      },
      line: {
        borderWidth: 3, // Line thickness
      },
    },
    scales: {
      x: {
        display: false, // Hides the x-axis
      },
      y: {
        display: false, // Hides the y-axis
      },
    },
  };

  return (
    <div className="bg-white py-6 pl-6 pr-[21.5px]  rounded-lg flex flex-col xl:max-h-[199px] border border-[#E9E9E9]">
      <div className="flex flex-row justify-between items-center">
        <h3 className="font-semibold text-[18px] leading-[26px] text-[#14151A]">
          {title}
        </h3>
        {hasReviewLink && (
          <p className="text-[#4778F5] font-semibold text-[14px] leading-[20px]">
            Review all
          </p>
        )}
      </div>

      <div className="flex flex-row justify-between">
        <div className="w-6/12">
          <p className="font-medium text-[14px] leading-[20px] text-[#858C95]">
            {period}
          </p>
          <p className="font-bold text-[30px] leading-[36px] tracking-[-1.6%] text-[#14151A] mt-[30px]">
            {value}
          </p>
        </div>
        <div className="mt-4 w-6/12">
          <Line data={data} options={options} />
        </div>
      </div>
      <div className="flex flex-row items-center mt-2 gap-2">
        <span
          className={`font-medium text-[14px] leading-[20px] tracking-[-0.5%] ${
            percentageChange >= 0 ? "text-[#26BD6C]" : "text-red-500"
          }`}
        >
          {percentageChange >= 0 ? "↑" : "↓"} {Math.abs(percentageChange)}%
        </span>

        <p className="font-medium text-[14px] leading-[20px] tracking-[-0.5%] text-[#858C95]">
          vs {period}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
