import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import AddFeeSchemeModal from "../AddFeeSchemeModal";

type Scheme = {
  id: string;
  activityName: string;
  rule: string;
  serviceFee: number;
};

const schemes: Scheme[] = [
  {
    id: "#302012",
    activityName: "Activity Name",
    rule: "Rule",
    serviceFee: 14.0,
  },
  {
    id: "#302013",
    activityName: "Activity Name",
    rule: "Rule",
    serviceFee: 14.0,
  },
  {
    id: "#302014",
    activityName: "Activity Name",
    rule: "Rule",
    serviceFee: 14.0,
  },
  {
    id: "#302015",
    activityName: "Activity Name",
    rule: "Rule",
    serviceFee: 14.0,
  },
  {
    id: "#302016",
    activityName: "Activity Name",
    rule: "Rule",
    serviceFee: 14.0,
  },
];

const FeeSchemeTable: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [isOpen, setIsOpen] = useState<number | null>(null);

  const handlePageClick = (page: number) => {
    setSelectedPage(page);
  };

  const toggleDropdown = (index: number) => {
    setIsOpen(isOpen === index ? null : index);
  };

  return (
    <div className="w-full bg-white shadow-md rounded-lg mt-6">
      <div className="flex justify-between items-center px-6 py-[18px]">
        <h2 className="text-[18px] font-semibold text-gray-900">Fee Scheme</h2>
        <AddFeeSchemeModal />
      </div>

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
                Activity Name
              </th>
              <th className="px-[22px] py-[18px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-[1px] border-[#E9E9E9]">
                Rules
              </th>
              <th className="px-[22px] py-[18px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-[1px] border-[#E9E9E9]">
                Service Fee
              </th>
              <th className="px-[22px] py-[18px] text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b-[1px] border-[#E9E9E9]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schemes.map((scheme, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4">
                  <input type="checkbox" className="form-checkbox h-4 w-4" />
                  {scheme.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer font-medium text-[14px] leading-[20px] ">
                  {scheme.activityName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#858C95] font-medium text-[14px] leading-[20px] ">
                  {scheme.rule}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-[#858C95] font-medium text-[14px] leading-[20px] ">
                  {scheme.serviceFee}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right relative">
                  <div className="relative inline-block text-left">
                    <button
                      type="button"
                      className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-gray-500"
                      onClick={() => toggleDropdown(idx)}
                    >
                      ⋮
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-b border-[#E9E9E9]"></div>
      <div className="flex items-center justify-between px-6 py-4">
        <span className="font-medium text-[14px] leading-[20px] tracking-[-0.5%] text-[#858C95]">
          Showing 1-10 from 100
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
                  ? "bg-[#14151A] text-white"
                  : "bg-transparent text-gray-500 hover:bg-gray-100"
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
            disabled={selectedPage === 5}
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeeSchemeTable;
