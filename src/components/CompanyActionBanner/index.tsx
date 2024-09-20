import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

const CompanyActionBanner: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Left Section - Logo, Name, and Status */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Back Arrow */}
          <button onClick={() => router.back()} className="w-6 h-6 text-black">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          {/* Company Logo */}
          <div className="w-[45px] h-[45px] bg-gray-400 rounded-full flex items-center justify-center">
            <img
              src="/path-to-image" // Replace with actual path
              alt="Company Logo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Company Name */}
          <span className="text-[24px] leading-[32px] text-[#14151A]">
            Tech Innovations Inc
          </span>

          {/* Status Badge */}
          <span className="px-3 py-1 bg-[#FDEDEC] text-[#E0944D] rounded-full text-sm font-medium">
            Pending
          </span>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          {/* Request Info Button */}
          <button className="w-full sm:w-auto px-5 py-2 text-sm bg-[#FFFF] font-medium text-[#14151A] border border-[#E9E9E9] rounded-[16px] hover:bg-gray-100">
            Request more info
          </button>

          {/* Reject Button */}
          <button className="w-full sm:w-auto px-5 py-2 text-sm font-medium text-[#E0944D] border border-[#F7C6C3] bg-white rounded-[16px] hover:bg-[#FDEDEC]">
            Reject
          </button>

          {/* Approve Button */}
          <button className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-white bg-[#212121] rounded-[16px] hover:bg-[#14151A]">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyActionBanner;
