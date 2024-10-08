import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Define the Company type
type Company = {
  id: string;
  name: string;
  dateJoined: string;
  status: "pending" | "active" | "suspended";
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
};

const CompaniesTable: React.FC = () => {
  const router = useRouter();

  // State to manage companies, pagination, and loading/error states
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch companies data when the component mounts
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:4000/company");
        const data = await response.json();

        // Assuming the API response matches the structure of the Company type
        setCompanies(data);
      } catch (err) {
        setError("Failed to fetch companies.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyClick = (companyId: string) => {
    router.push(`/company/service-fee?companyId=${companyId}`);
  };

  const handlePageClick = (page: number) => {
    setSelectedPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full">
      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto">
          <thead className="bg-[#F8F8F9]">
            <tr>
              <th className="px-[22px] py-[18px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-[8px] border-b-[1px] border-[#E9E9E9]">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
                ID
              </th>
              <th className="px-[22px] py-[18px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-[1px] border-[#E9E9E9]">
                Company Name
              </th>
              <th className="px-[22px] py-[18px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-[1px] border-[#E9E9E9]">
                Date Joined
              </th>
              <th className="px-[22px] py-[18px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-[1px] border-[#E9E9E9]">
                Status
              </th>
              <th className="px-[22px] py-[18px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-[1px] border-[#E9E9E9]">
                Last Activity
              </th>
              <th className="px-[22px] py-[18px] text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b-[1px] border-[#E9E9E9]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4">
                  <input type="checkbox" className="form-checkbox h-4 w-4" />
                  {company.id}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer text-[#4778F5] font-medium text-[14px] leading-[20px] "
                  onClick={() => handleCompanyClick(company.id)}
                >
                  {company.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#858C95] font-medium text-[14px] leading-[20px] ">
                  {moment(company.createdAt).format("MMM DD - YYYY")}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      company.status === "active"
                        ? "bg-green-100 text-green-800"
                        : company.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {company?.status?.charAt(0)?.toUpperCase() +
                      company?.status?.slice(1)?.toLowerCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#858C95] font-medium text-[14px] leading-[20px] ">
                  {moment(company.updatedAt).format("MMM DD - YYYY")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-gray-500 cursor-pointer">⋮</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-b border-[#E9E9E9]"></div>
      <div className="flex items-center justify-between px-6 py-4 ">
        <span className="font-medium text-[14px] leading-[20px] tracking-[-0.5%] text-[#858C95]">
          Showing 1-10 from {companies.length}
        </span>

        <div className="inline-flex items-center space-x-2">
          {/* Previous Button */}
          <button
            className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-500 bg-white rounded-lg hover:bg-gray-100"
            onClick={() => handlePageClick(selectedPage - 1)}
            disabled={selectedPage === 1}
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          {/* Page Numbers */}
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg ${
                selectedPage === page
                  ? "bg-[#14151A] text-white" // Active page style
                  : "bg-transparent text-gray-500 hover:bg-gray-100" // Non-selected page style
              }`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}

          {/* Ellipsis */}
          <span className="text-gray-500">...</span>

          {/* Next Button */}
          <button
            className="w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-500 bg-white rounded-lg hover:bg-gray-100"
            onClick={() => handlePageClick(selectedPage + 1)}
            disabled={selectedPage === 5} // Assuming 5 is the last page
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesTable;
