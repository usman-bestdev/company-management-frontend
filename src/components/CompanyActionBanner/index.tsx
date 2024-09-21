import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CompanyActionBanner: React.FC = () => {
  const searchParams = useSearchParams();

  const companyId = searchParams.get("companyId");
  const router = useRouter();
  const [company, setCompany] = useState<null | {
    name: string;
    status: string;
    logoUrl: string;
  }>(null);

  // Fetch the company data by companyId
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/company/${companyId}`
        );
        const data = await response.json();
        setCompany({
          name: data.name,
          status: data.status,
          logoUrl: data.logoUrl || "/default-logo.png", // Fallback if no logo
        });
      } catch (error) {
        console.error("Failed to fetch company data", error);
      }
    };

    fetchCompany();
  }, [companyId]);

  if (!company) {
    return <div>Loading...</div>; // Add a loading state
  }

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
              src={company.logoUrl}
              alt="Company Logo"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Company Name */}
          <span className="text-[24px] leading-[32px] text-[#14151A]">
            {company.name}
          </span>

          {/* Status Badge */}
          <span className={`px-3 py-1 
          
          ${
                      company.status === "active"
                        ? "bg-green-100 text-green-800"
                        : company.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }
          rounded-full text-sm font-medium`}>
            {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
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
